import { SimpleJS } from '../dist/index.js'
import { Game, size } from './App.js'
import { Bomb } from './components/bomb.js'
import { Queue } from './Queue.js'
import { Welcome } from './Welcome.js'

SimpleJS.state = {
  bombs: [],
  powers: [],
  grids: [],
  fires: [],
  monsters: [],
  player: null,
  initialized: false,
  pause: false,
  playerCount: 0,
  playerName: '',
  players: {},
  chat: [],
  message: '',
}

SimpleJS.addRoute('/', Welcome)
SimpleJS.addRoute('/queue', Queue)
SimpleJS.addRoute('/game', Game)
SimpleJS.addRoute('/notfound', () => {
  return SimpleJS.createElement('div', {}, ['error 404'])
})

const component = SimpleJS.routes[window.location.pathname]
if (component) {
  SimpleJS.mount(component)
}

export const ws = new WebSocket('/')



ws.onopen = () => {
  console.log('you are connected to the server')
}

const bombUsers = new Bomb(true)

let resetMoves




ws.onmessage = event => {
  const {
    type,
    content,
    playerCount,
    playerName,
    boombX,
    boombY,
    cls,
    diffMap,
    playerX,
    playerY,
    moveUp,
    moveRight,
    moveLeft,
    moveDown,
    timer,
    message,
    expCount,
    row,
    col,
    lifes,
    messages
  } = JSON.parse(event.data)

  switch (type) {
    case 'error':
      console.error(content)
      break
    case 'appendQueue':
      console.log('appendQueue', playerCount, playerName)
      SimpleJS.setState(prev => ({
        ...prev,
        playerCount,
        playerName: prev.playerName ? prev.playerName : playerName,
        chat: messages,
      }))
      if (location.pathname !== '/queue') {
        SimpleJS.Link('/queue')
      }
      break
    case 'startGame':
      SimpleJS.state.players = cls
      SimpleJS.state.diffMap = diffMap
      if (location.pathname !== '/game') {
        SimpleJS.Link('/game')
      }
    case 'startTime':
      SimpleJS.setState(prev => ({ ...prev, timer }))
      break
    case 'moves':
      SimpleJS.state.players[playerName].pObj.x = playerX * size
      SimpleJS.state.players[playerName].pObj.y = playerY * size
      SimpleJS.state.players[playerName].pObj.moveUp = moveUp
      SimpleJS.state.players[playerName].pObj.moveDown = moveDown
      SimpleJS.state.players[playerName].pObj.moveLeft = moveLeft
      SimpleJS.state.players[playerName].pObj.moveRight = moveRight

      clearTimeout(resetMoves)
      resetMoves = setTimeout(() => {
        SimpleJS.state.players[playerName].pObj.moveDown = false
        SimpleJS.state.players[playerName].pObj.moveLeft = false
        SimpleJS.state.players[playerName].pObj.moveUp = false
        SimpleJS.state.players[playerName].pObj.moveRight = false
      }, 50)
      break
    case 'boomb':
      bombUsers.putTheBomb(boombX * size, boombY * size, expCount)
      break
    case 'powerups':
      SimpleJS.state.grids[row][col].power = "";
      SimpleJS.setState((prev) => ({
        ...prev,
        powers: prev.powers.filter((p) => p.id !== SimpleJS.state.grids[row][col].id),
      }));
      break
    case 'newMessage':
      console.log(message);

      SimpleJS.setState((prev) => {
        return {
          ...prev, chat: [...prev.chat, { playerName, message }]
        }
      })
      console.log(SimpleJS.state.chat);

      break
    case 'lifes':
      SimpleJS.setState((prev) => {
        prev.players[playerName].pObj.lifes = lifes
        return prev
      })
      break
  }
}

ws.onclose = () => {
  console.log('Disconnected from server')
}

ws.onerror = error => {
  console.error('WebSocket error:', error)
}
