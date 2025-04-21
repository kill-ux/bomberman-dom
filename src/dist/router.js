
import { mountCallback, updateElement } from "./dom.js";
import { SimpleJS } from "./index.js";


// Handle navigation
export function router() {
    const component = SimpleJS.routes[window.location.pathname];
    if (component) {
        SimpleJS.newVDOM = component
        const newVDom = SimpleJS.newVDOM();
        updateElement(SimpleJS.rootElement.childNodes[0], SimpleJS.currentVDOM, newVDom);
        SimpleJS.currentVDOM = newVDom;
        mountCallback.forEach(callback => {
            callback()
        })
        mountCallback.clear()
    }
};


export function addRoute(path, component) {
    SimpleJS.routes[path] = component;
};


export const Link = (path) => {
    history.pushState({}, "", path)
    router()
}
