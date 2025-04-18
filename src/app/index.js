
import { App } from '../app/App.js';
import { Websocket } from '../app/chat.js';
import { SimpleJS } from '../dist/index.js';

SimpleJS.state = {
    player:"",
    players:[],
    room: 0,
    Number:0,   
    message: "",
    massages: [] 
}

SimpleJS.addRoute('/', App)
SimpleJS.addRoute('/Websocket', Websocket)
SimpleJS.addRoute('/notfound', () => {
    return SimpleJS.createElement("div", {}, ["error 404"])
})

const component = SimpleJS.routes[window.location.pathname]
if (component) {
    SimpleJS.mount(component);
}


