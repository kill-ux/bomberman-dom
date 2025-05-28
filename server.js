import fs from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { WebSocketServer } from 'ws'

const hostname = ''
const port = 3000
const baseDirectory = process.cwd()

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    'webp': 'image/webp',
}

// Function to serve index.html
async function serveIndexHtml(res) {
    const indexPath = path.join(baseDirectory, 'index.html');
    try {
        const data = await fs.readFile(indexPath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        res.end(data);
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
    }
}
const server = createServer()

server.on('request', async (req, res) => {
    const filePath = req.url === '/' ? '/index.html' : req.url
    const ph = path.join(baseDirectory, filePath)
    try {
        const stats = await fs.stat(ph)
        if (stats.isFile()) {
            const ext = path.extname(ph)
            const contentType = mimeTypes[ext] || 'text/plain'
            // Read file based on content type
            const isBinary = contentType.startsWith('image/')
            const data = await fs.readFile(ph, isBinary ? null : 'utf8')

            res.statusCode = 200
            res.setHeader('Content-Type', contentType)
            res.end(data)
        } else {
            await serveIndexHtml(res)
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            await serveIndexHtml(res)
        } else {
            console.error('Server error:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'text/plain')
            res.end('Internal Server Error')
        }
    }
})

const DiffMap = () => {
    const arr = []
    for (let index = 0; index < 126; index++) {
        arr[index] = [Math.random(), Math.random()]
    }
    return arr
}
let currentPage = ''
let timeout
const wss = new WebSocketServer({ server })
const Clients = new Map()
const livePlayers = new Set()
const spawns = [
    [1, 1],
    [21, 9],
    [21, 1],
    [1, 9]
]

let diffMap
let gameStarted = false

const startTime = () => {
    gameStarted = true
    let timer10 = 10
    timeout = setInterval(() => {
        if (timer10 === -1) {
            if (Clients.size == 1) {
                Clients.forEach((value, key) => {
                    value.ws.send(JSON.stringify({ type: "win", playerName: key }))
                })
                Clients.clear()
                livePlayers.clear()
                gameStarted = false
                timer10 = null
                clearInterval(timeout)

            } else {
                let cls = {}
                let index = 0
                Clients.forEach(({ lifes }, key) => {
                    cls[key] = { lifes, spawn: spawns[index], image: index + 1 }
                    index++
                })
                Clients.forEach(value => {
                    value.ws.send(JSON.stringify({ type: "startGame", cls, diffMap, playerNames: [...livePlayers] }))
                })
                timer10 = null
                currentPage = "game"
                clearInterval(timeout)
            }

        } else {
            Clients.forEach(value => {
                value.ws.send(JSON.stringify({ type: "startTime", timer: timer10 }))
            })
            timer10--
        }
    }, 1000)
}

wss.on('connection', ws => {
    console.log('New client connected')
    let playerName
    ws.on('message', message => {
        let data = {}
        try {
            data = JSON.parse(message)
        } catch (error) {
            console.error(error)
        }
        switch (data.type) {
            case 'newPlayer':
                if (Clients.size === 0) {
                    diffMap = DiffMap()
                }
                if (gameStarted) {
                    ws.send(JSON.stringify({ type: 'error', content: 'game started wait until finished' }))
                    return
                }
                if (Clients.size < 4) {
                    if (data.playername && !Clients.has(data.playername) && data.playername.length > 0 && data.playername.length <= 10) {
                        playerName = data.playername
                        console.log(`${playerName} join the room`)
                        Clients.set(playerName, {
                            ws,
                            lifes: 3
                        })
                        livePlayers.add(playerName)

                        Clients.forEach(value => {
                            value.ws.send(
                                JSON.stringify({
                                    type: 'appendQueue',
                                    playerCount: Clients.size,
                                    playerName,
                                })
                            )
                        })

                        currentPage = "queue"

                        if (Clients.size == 2) {
                            clearTimeout(timeout)
                            timeout = setTimeout(() => {
                                if (Clients.size > 1) {
                                    startTime()
                                }
                            }, 20000)
                        }
                        if (Clients.size == 4) {
                            clearTimeout(timeout)
                            startTime()
                        } else {

                        }
                    } else {
                        ws.send(JSON.stringify({ type: 'error', content: 'invalid name' }))
                    }
                }
                break
            case 'newMessage':
                Clients.forEach((value, key) => {
                    if (key != data.playerName) {
                        value.ws.send(JSON.stringify(data))
                    }
                })
                break

            case 'lifes':
                if (data.lifes === 0) {
                    livePlayers.delete(data.playerName)
                    if (livePlayers.size == 1) {
                        gameStarted = false
                    }
                }
            case 'moves':
            case 'boomb':
            case 'powerups':
                Clients.forEach((value, key) => {
                    if (key != data.playerName) {
                        value.ws.send(JSON.stringify(data))
                    }
                })
                if (!gameStarted) {
                    const playerwon = [...livePlayers][0]
                    Clients.forEach((value) => {
                        value.ws.send(JSON.stringify({ type: "win", playerName: playerwon }))
                    })
                    Clients.clear()
                    livePlayers.clear()
                }
                break
        }
    })

    ws.on('close', () => {
        console.log(`${playerName} are close his connection`)
        livePlayers.delete(playerName)
        Clients.delete(playerName)
        if (currentPage === "game") {
            Clients.forEach((value, key) => {
                if (key != playerName) {
                    value.ws.send(JSON.stringify({
                        type: 'lifes',
                        lifes: 0,
                        playerName: playerName,
                    }))
                }
            })

            if (Clients.size === 1) {
                Clients.forEach((value, key) => {
                    value.ws.send(JSON.stringify({ type: "win", playerName: key }))
                })
                Clients.clear()
                livePlayers.clear()
            }
        }
        if (currentPage === "queue") {
            Clients.forEach(value => {
                value.ws.send(
                    JSON.stringify({
                        type: 'ModifyQueue',
                        playerCount: Clients.size,
                        playerName
                    })
                )
            })
        }
        if (Clients.size === 0) {
            clearTimeout(timeout)
            gameStarted = false
            diffMap = null
            livePlayers.clear()
            console.log('All clients disconnected, server reset')
        }
        console.log('Client disconnected')
    })
})

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
