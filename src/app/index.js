
import { App } from '../app/App.js';
import { SimpleJS } from '../dist/index.js';

SimpleJS.state = {}

SimpleJS.addRoute('/', App)
SimpleJS.addRoute('/notfound', () => {
    return SimpleJS.createElement("div", {}, ["error 404"])
})

const component = SimpleJS.routes[window.location.pathname]
if (component) {
    SimpleJS.mount(component);
}