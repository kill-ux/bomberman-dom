
import { SimpleJS } from '../dist/index.js';
import { Game } from './App.js';
import { Queue } from './Queue.js';
import { Welcome } from './Welcome.js';

SimpleJS.state = {
  bombs: [],
  grids: [],
  fires: [],
  monsters: [],
  player: null,
  initialized: false,
  pause: false,
  playerCount: 0,
  playerName: "",
  players: {}
}

SimpleJS.addRoute('/', Welcome)
SimpleJS.addRoute('/queue', Queue)
SimpleJS.addRoute('/game', Game)
SimpleJS.addRoute('/notfound', () => {
  return SimpleJS.createElement("div", {}, ["error 404"])
})

const component = SimpleJS.routes[window.location.pathname]
if (component) {
  SimpleJS.mount(component);
}

export const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('you are connected to the server');
};

let interval
ws.onmessage = (event) => {
  const { type, content, playerCount, playerName, cls, diffMap , timer } = JSON.parse(event.data)
  switch (type) {
    case "error":
      console.error(content)
      break
    case "appendQueue":

      SimpleJS.setState(prev => ({ ...prev, playerCount, playerName: prev.playerName ? prev.playerName : playerName }))
      if (location.pathname !== "/queue") {
        SimpleJS.Link("/queue")
      }
      break
    case "startGame":
      SimpleJS.state.players = cls
      SimpleJS.state.diffMap = diffMap
      if (location.pathname !== "/game") {
        SimpleJS.Link("/game")
      }
    case "startTime":
        SimpleJS.setState((prev) => ({ ...prev , timer }))
      break
  }
};

ws.onclose = () => {
  console.log('Disconnected from server');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};