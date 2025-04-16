import { createElement, mount, render } from "./dom.js";
import { addRoute, Link, router } from "./router.js";
import { setState } from "./state.js";

export const SimpleJS = {
    state: {},
    setState,

    currentVDOM: null,
    newVDOM: null,
    rootElement: document.getElementById('app'),

    render,
    mount,
    createElement,

    routes: {},
    addRoute,
    router,
    Link
};


// Initialize router
window.addEventListener("popstate", () => SimpleJS.router());
