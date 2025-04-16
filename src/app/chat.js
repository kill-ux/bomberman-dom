import { SimpleJS } from '../dist/index.js';

export const Websocket = () => {
  const ws = new WebSocket('ws://localhost:3000');

  ws.onopen = () => {
    console.log('Connected to server');
  };

  ws.onmessage = (event) => {
    const data = event.data;
    console.log(`Message from server: ${data}`);
  };

  ws.onclose = () => {
    console.log('Connection closed');
  };

  const AjoutPlayrs = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value; 
    console.log(name);

  
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action: 'join', name: name }));
    } else {
      console.log('WebSocket is not open');
    }
  };

  return (
    SimpleJS.createElement('div', { class: 'map', tabindex: 0, autofocus: true }, [
      
      SimpleJS.createElement('h1', {}, ["Websocket"]),
      SimpleJS.createElement('form', { method: 'POST', onsubmit: AjoutPlayrs }, [
        SimpleJS.createElement('input', { type: 'text', name: 'name', placeholder: 'Enter your name' }, []),
        SimpleJS.createElement('button', { type: 'submit' }, ["Join"])
      ])
    ])
  );
};
