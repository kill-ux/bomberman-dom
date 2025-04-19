import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { WebSocketServer } from 'ws';

const hostname = '';
const port = 3000;
const baseDirectory = process.cwd();

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png'
};

// Function to serve index.html
async function serveIndexHtml(res) {
    const indexPath = path.join(baseDirectory, 'index.html');
    try {
        const data = await fs.readFile(indexPath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        console.log("yes");

        res.end(data);
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
    }
}
const server = createServer();

server.on("request", async (req, res) => {
    const filePath = req.url === "/" ? "/index.html" : req.url;
    const ph = path.join(baseDirectory, filePath);
    try {
        const stats = await fs.stat(ph);
        if (stats.isFile()) {
            const ext = path.extname(ph);
            const contentType = mimeTypes[ext] || 'text/plain';
            // Read file based on content type
            const isBinary = contentType.startsWith('image/');
            const data = await fs.readFile(ph, isBinary ? null : 'utf8');

            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(data);
        } else {
            await serveIndexHtml(res);
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            await serveIndexHtml(res);
        } else {
            console.error('Server error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
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


let time
let playerCount = 0
const wss = new WebSocketServer({ server })
const Clients = new Map()
// room => Map of users
const spawns = [[1, 1], [21, 9], [21, 1], [1, 9]]
let diffMap

wss.on('connection', (ws) => {
    console.log('New client connected');
    let playerName
    ws.on('message', (message) => {
        let data = JSON.parse(message)
        switch (data.type) {
            case "newPlayer":
                if (Clients.size === 0) {
                    diffMap = DiffMap()
                }
                if (Clients.size < 4) {
                    if (data.playername && !Clients.has(data.playername)) {
                        playerName = data.playername
                        console.log(`${playerName} join the room`)
                        Clients.set(data.playername, {
                            ws,
                            lifes: 3,
                            spawn: spawns[Clients.size],
                            image: Clients.size + 1
                        })

                        Clients.forEach(value => {
                            value.ws.send(JSON.stringify({ type: "appendQueue", playerCount: Clients.size, playerName }))
                        })

                        if (Clients.size == 2) {
                            let cls = {}
                            Clients.forEach(({ lifes, spawn }, key) => {
                                cls[key] = { lifes, spawn }
                            })
                            console.log(cls)

                            Clients.forEach(value => {
                                value.ws.send(JSON.stringify({ type: "startGame", cls, diffMap }))
                            })
                        }

                    } else {
                        ws.send(JSON.stringify({ type: "error", content: "invalid name" }))
                    }
                }

            case "newMessage":
            //
            case "moves":
                Clients.forEach((value, key) => {
                    if (key != data.playerName){
                        value.ws.send(message)
                    }
                })
            //
            case "bomb":
            //
            case "dead":
            //
        }
    });

    ws.on('close', () => {
        console.log(`${playerName} are close his connection`)
        Clients.delete(playerName)
        // send 
        console.log('Client disconnected');
    });

});


// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});