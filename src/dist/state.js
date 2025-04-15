import { updateElement } from "./dom.js";
import { SimpleJS } from "./index.js";

export function setState(newState) {
    if (typeof newState == "function") {
        SimpleJS.state = { ...SimpleJS.state, ...newState(SimpleJS.state) };
    } else {
        SimpleJS.state = { ...SimpleJS.state, ...newState };
    }
    
    const newVDom = SimpleJS.newVDOM();
    updateElement(SimpleJS.rootElement.childNodes[0], SimpleJS.currentVDOM, newVDom);
    SimpleJS.currentVDOM = newVDom;
};