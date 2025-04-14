import { SimpleJS } from "./index.js";


export const createElement = (tag, attrs = {}, children = []) => ({ tag, attrs, children })


export const mount = (component) => {
    SimpleJS.newVDOM = component
    const vDom = component()
    SimpleJS.currentVDOM = vDom;
    SimpleJS.rootElement.innerHTML = ""
    SimpleJS.render(vDom, SimpleJS.rootElement);
};

export const render = (vNode, container) => {
    if (typeof vNode === 'string') {
        const textNode = document.createTextNode(vNode);
        container.appendChild(textNode);
        return textNode;
    }

    const element = document.createElement(vNode.tag);

    for (const [key, value] of Object.entries(vNode.attrs || {})) {
        if (key.startsWith('on')) {
            const eventName = key.toLowerCase()
            element[eventName] = value
        } else {
            if (typeof value === "boolean") {
                if (value == true) {
                    element.setAttribute(key, value);
                } else {
                    element[key] = false
                    element.removeAttribute(key)
                }
            } else {
                if (key === "ref") {
                    value.current = element
                } else {
                    element.setAttribute(key, value);
                }
            }
        }
    }

    (vNode.children || []).forEach((child, index) => {
        SimpleJS.render(child, element);
    });

    container.appendChild(element);
    return element;
};


export function updateElement(realElement, oldVDom, newVDom) {
    
    if (!oldVDom || oldVDom.tag !== newVDom.tag) {
        const newElement = SimpleJS.render(newVDom, realElement);
        realElement.parentNode.replaceChild(newElement, realElement);
        return;
    }

    updateAttributes(realElement, oldVDom.attrs, newVDom.attrs);

    updateChildren(realElement, oldVDom.children, newVDom.children);
}







function updateAttributes(element, oldAttrs, newAttrs) {
    oldAttrs = oldAttrs || {};
    newAttrs = newAttrs || {};

    // Remove old event listeners and attributes
    Object.entries(oldAttrs).forEach(([key, value]) => {
        if (key.startsWith('on')) {
            const eventName = key.toLowerCase()
            if (!newAttrs[eventName]) {
                element[eventName] = null
            }
        } else if (!(key in newAttrs)) {
            if (typeof value === "boolean") {
                element[key] = false;
            }
            element.removeAttribute(key);
        }
    });

    // Set new attributes and event listeners
    Object.entries(newAttrs).forEach(([key, value]) => {
        if (oldAttrs[key] === value) return;

        if (key.startsWith('on')) {
            const eventName = key.toLowerCase()
            element[eventName] = value
        } else if (typeof value === "boolean") {

            element[key] = value

            if (value) {
                element.setAttribute(key, '');
            } else {
                element.removeAttribute(key);
            }
        } else {
            if (key === "ref") {
                value.current = element
            } else {
                element.setAttribute(key, value);
            }
        }
    });

}

function updateChildren(element, oldChildren, newChildren) {

    oldChildren = oldChildren || [];
    newChildren = newChildren || [];

    // Map of old children by key for quick lookup
    const oldKeys = new Map();
    oldChildren.forEach((child, index) => {
        if (typeof child !== 'string' && child.attrs?.key) {
            oldKeys.set(child.attrs.key, { vdom: child, element: element.childNodes[index] });
        }
    });

    // Remove old children whose keys are not in newChildren
    const newKeys = new Set(newChildren.filter(c => typeof c !== 'string' && c.attrs?.key).map(c => c.attrs.key));
    oldKeys.forEach((value, key) => {
        if (!newKeys.has(key)) {
            element.removeChild(value.element);
        }
    });

    // Update or insert children at each position
    newChildren.forEach((newChild, i) => {
        let realChild = element.childNodes[i];

        if (typeof newChild === 'string') {
            if (realChild && realChild.nodeType === Node.TEXT_NODE) {
                if (realChild.textContent !== newChild) {
                    realChild.textContent = newChild;
                }
            } else {
                const textNode = document.createTextNode(newChild);
                if (realChild) {
                    element.replaceChild(textNode, realChild);
                } else {
                    element.appendChild(textNode);
                }
            }
        } else {
            const newKey = newChild.attrs?.key;
            if (newKey) {
                const oldEntry = oldKeys.get(newKey);
                if (oldEntry) {
                    const oldElement = oldEntry.element;
                    if (oldElement !== realChild) {
                        element.insertBefore(oldElement, realChild);
                        realChild = oldElement;
                    }
                    updateElement(realChild, oldEntry.vdom, newChild);
                } else {
                    const newElement = SimpleJS.render(newChild, element);
                    if (realChild) {
                        element.insertBefore(newElement, realChild);
                    } else {
                        element.appendChild(newElement);
                    }
                }
            } else {
                // Handle non-keyed elements
                if (realChild && realChild.nodeType === Node.ELEMENT_NODE) {
                    const oldChild = oldChildren[i];
                    if (typeof oldChild === 'object' && oldChild.tag === newChild.tag && !oldChild.attrs?.key) {
                        updateElement(realChild, oldChild, newChild);
                    } else {
                        const newElement = SimpleJS.render(newChild, element);
                        element.replaceChild(newElement, realChild);
                    }
                } else {
                    const newElement = SimpleJS.render(newChild, element);
                    if (realChild) {
                        element.replaceChild(newElement, realChild);
                    } else {
                        element.appendChild(newElement);
                    }
                }
            }
        }
    });

    // Remove any extra children
    while (element.childNodes.length > newChildren.length) {
        element.removeChild(element.lastChild);
    }
}