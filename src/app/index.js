
import { App } from '../app/App.js';
import { SimpleJS } from '../dist/index.js';

SimpleJS.state = {
    bombs: [],
    grids: [],
    fires: [],
    monsters:[],
    player: null,
    initialized: false,
    pause:false
}

SimpleJS.addRoute('/', App)
SimpleJS.addRoute('/notfound', () => {
    return SimpleJS.createElement("div", {}, ["error 404"])
})

const component = SimpleJS.routes[window.location.pathname]
if (component) {
    SimpleJS.mount(component);
}

export const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  ws.send('Hello, server');
};

ws.onmessage = (event) => {
  console.log(`Received: ${event.data}`);
};

ws.onclose = () => {
  console.log('Disconnected from server');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};