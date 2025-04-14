# SimpleJS Framework Documentation

## Overview

**SimpleJS** is a lightweight JavaScript framework designed to simplify web development by abstracting the DOM, managing state, handling events, and supporting routing. With a **diffing algorithm**, it updates the DOM efficiently by comparing virtual DOM trees and modifying only what has changed, making it ideal for dynamic single-page applications (SPAs).

### Features
- **DOM Abstraction**: Uses a virtual DOM to represent and manipulate UI elements.
- **Efficient Updates**: A diffing algorithm minimizes real DOM changes.
- **Event Handling**: Custom event system via attributes (e.g., `onClick`), with listener tracking for updates.
- **State Management**: Centralized state that triggers UI updates.
- **Routing**: Path-based navigation for SPAs using browser history.

---

## Getting Started

### Setup
1. Download the framework or clone it:
```bash
git clone https://github.com/Margoumachraf/framework.git
```
or
```bash
npx @killuakabani/create-my-framework my-app
```
2. Define your app logic in `/app` and add routing in `/app/index.js`.

---

## API Reference & Examples

### Creating an Element
```javascript
const div = SimpleJS.createElement('div', { class: 'container' }, ['Hello, World!']);
```
- **Purpose**: Creates a virtual DOM node representing `<div class="container">Hello, World!</div>`.
- **Parameters**:
  - `tag`: The HTML tag (e.g., `'div'`, `'button'`).
  - `attrs`: An object of attributes (e.g., `{ class: 'container' }`). Required; use `{}` if no attributes.
  - `children`: An array of child nodes (strings or virtual DOM objects). Optional; defaults to `[]`.

### Creating an Event
```javascript
const button = SimpleJS.createElement('button', {
    onClick: () => alert('Clicked!')
}, ['Click Me']);
```
- **Purpose**: Attaches an event handler to the element, triggered on user interaction. Case-insensitive.
- **How It Works**: The `onClick` attribute is detected during rendering or diffing, and the handler is bound to the real DOM element. Updates are managed efficiently.

### Nesting Elements
```javascript
const nested = SimpleJS.createElement('div', {}, [
    SimpleJS.createElement('p', { class: 'text' }, ['Nested Text']),
    'More Text'
]);
```
- **Purpose**: Creates a `<div>` with a `<p>` and a text node inside.
- **How It Works**: Children can be virtual DOM nodes or strings, recursively rendered or updated.

### Adding Attributes
```javascript
const input = SimpleJS.createElement('input', {
    type: 'text',
    placeholder: 'Enter text',
    class: 'input-field'
});
```
- **Purpose**: Adds attributes like `type` or `class` to an element.
- **How It Works**: Attributes are applied during initial render and updated if changed in subsequent renders.

### State Management
```javascript
SimpleJS.state = {
    count: SimpleJS.state.count || 0,
    todos: [],
    autoincrement: 1
};
```
- **Purpose**: Updates the global state and triggers a re-render with diffing.
- **Declaration**: Define new states in the `state` object in `app/index.js`. Only global states are supported.
- **Accessing**: Use `SimpleJS.state.count` to read state.
- **Updating**: Use `SimpleJS.setState()` to update state. Examples:
  - **Replace**:
    ```javascript
    SimpleJS.setState({ count: 5 });
    ```
  - **Update based on previous value**:
    ```javascript
    SimpleJS.setState((prev) => ({ count: prev.count + 1 })); // Recommended
    SimpleJS.setState({ count: SimpleJS.state.count + 1 });
    ```
    Both methods are equivalent; the first is more familiar to some developers.

#### Example with State
```javascript
// in app/app.js
const App = () => SimpleJS.createElement('div', {}, [
    `Count: ${SimpleJS.state.count || 0}`,
    SimpleJS.createElement('button', {
        onClick: () => SimpleJS.setState({ count: (SimpleJS.state.count || 0) + 1 })
    }, ['Increment'])
]);
```

### Routing
```javascript
SimpleJS.addRoute('/home', () => SimpleJS.createElement('h1', {}, ['Home']));
SimpleJS.router();
```
- **Purpose**: Defines routes and renders components based on the current URL path (e.g., `/home`). Place routes in `app/index.js`.
- **How It Works**: Uses the browser’s `history` API to track navigation via `window.location.pathname`. If no route matches, a `NotFound` component is rendered.
- **Adding Routes**:
  ```javascript
  SimpleJS.addRoute('/about', () => SimpleJS.createElement('h1', {}, ['About']));
  ```
- **Navigating**:
  Use the `Link` function to navigate programmatically:
  ```javascript
  SimpleJS.Link('/home');
  ```
  This updates the URL using `history.pushState` and triggers the router to render the corresponding component.
- **Router Initialization**:
  Call `SimpleJS.router()` to start the router and render the component for the current URL.

#### Example with Routing
```javascript
// In app/index.js
import { SimpleJS } from './simplejs.js';

SimpleJS.addRoute('/home', () => SimpleJS.createElement('h1', {}, ['Home']));
SimpleJS.addRoute('/about', () => SimpleJS.createElement('h1', {}, ['About']));

const app = () => SimpleJS.createElement('div', {}, [
    SimpleJS.createElement('button', { onClick: () => SimpleJS.Link('/home') }, ['Go to Home']),
    SimpleJS.createElement('button', { onClick: () => SimpleJS.Link('/about') }, ['Go to About']),
    SimpleJS.router()
]);
```

---

## How It Works

### DOM Abstraction
- **Virtual DOM**: UI is represented as a tree of JavaScript objects (e.g., `{ tag: 'div', attrs: {}, children: [] }`).
- **Rendering**: `SimpleJS.render` converts virtual DOM nodes to real DOM elements initially.
- **Diffing**: `updateElement` compares old and new virtual DOMs, updating the real DOM efficiently.

### Event Handling
- **Custom System**: Events like `onClick` are specified in the `attrs` object.
- **Listener Tracking**: Each real DOM element has an `_listeners` object to store event handlers, ensuring they can be removed or updated during diffing.
- **Why It Works**: Prevents duplicate listeners and ensures the real DOM matches the virtual DOM’s event intent.

### State Management
- **Global State**: Stored in `SimpleJS.state`, updated via `setState`.
- **Reactivity**: State changes trigger a new virtual DOM, which is diffed against the old one to update the UI.

### Routing
- **Path-Based**: Uses `window.location.pathname` to manage app state.
- **Navigation**: The `Link` function updates the URL with `history.pushState` and triggers `router()` to render the matching component.
- **Sync**: URL changes trigger re-renders with diffing applied.

### Diffing Algorithm
- **Purpose**: Reduces DOM manipulations by updating only changed parts.
- **Process**:
  - **Tag Check**: If tags differ, replace the entire element.
  - **Attributes**: Update or remove attributes/event listeners as needed, using `element._listeners` for event management.
  - **Keys for Lists**: Add a `key` attribute to virtual DOM nodes for better list diffing (use unique IDs, not indexes).
  - **Children**: Recursively update, replace, add, or remove child nodes.
- **Why It Works**: By comparing old and new virtual DOMs, only necessary changes are applied, improving performance over full re-renders.
