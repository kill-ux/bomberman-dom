import { SimpleJS } from '../dist/index.js';

export const Websocket = () => {
  const ws = new WebSocket('ws://localhost:3000');

  ws.onopen = () => {
    console.log('Connected to server');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data.action);
    // if (data.action === "Room") {

    // }
    switch (data.action) {
      case "Room":
        if (data.play) {
          console.log(true);
          console.log("start game");

        } else {

          console.log("wait");

        }
        break;
      case "message":
       
      break
      default:
        break;
    }
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
      ]),

   



    SimpleJS.createElement('h1', {}, ["Websocket"]),





    SimpleJS.createElement('div', {}, [
      SimpleJS.createElement('div', {}, [
        messages
      ])
    ]),



    SimpleJS.createElement('form', { method: 'POST', onsubmit: AjoutPlayrs }, [
      SimpleJS.createElement('input', { type: '', name: 'name', placeholder: 'Enter your name' }, []),
      SimpleJS.createElement('button', { type: 'submit' }, ["Join"])
    ])


  ])






  );
};
