# Bomberman DOM — Arena Bomb

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-SEE--LICENSE-lightgrey.svg)

Lightweight multiplayer Bomberman-style game that runs in the browser and uses a WebSocket server for real-time multiplayer. The project is implemented with plain Node.js for the server and a small custom UI runtime under `dist/` for the client.

## What this project does

Arena Bomb (a.k.a. `bomberman-dom`) is a browser-playable, top-down arena game where 2–4 players connect to a central server and compete by placing bombs, collecting power-ups, and trying to be the last player alive.

Key behaviours implemented by the repository:

- Simple static file server and WebSocket-based multiplayer server (`server.js`).
- Client UI and game logic in `src/app/` (routing, game, queue, chat, player, map, bombs, and animations).
- Map layout, power-ups and player spawning logic.
- Chat between connected players.

## Why this project is useful

- Small, self-contained example of a multiplayer browser game using WebSockets.
- Good starting point for learning real-time game loops, simple collision/board logic, and lightweight front-end rendering without a big framework.
- Easy to run locally or adapt to a hosted environment.

## Repository layout (important files)

- `server.js` — Node.js HTTP server and WebSocket server (entrypoint).
- `index.html` — Game entry page that loads client assets.
- `assets/` — Images and styles used by the client.
- `src/app/` — Main client application source (Welcome, Queue, Game, Chat, components).
- `dist/` — Bundled client runtime used by the app (small utilities and SimpleJS runtime).
- `package.json` — Node dependency manifest and scripts.

## Getting started — quick start

These instructions assume you have Node.js (v18+ recommended) and a POSIX shell.

1. Clone the repository and install dependencies:

```bash
git clone <repo_url>
cd bomberman-dom
npm install
```

2. Start the server (serves static files and accepts WebSocket connections):

```bash
npm start
# or
node server.js
```

3. Open your browser and navigate to:

```
http://localhost:3000/
```

4. Open multiple browser windows/tabs (or share the URL) to connect multiple players. Enter a nickname on the Welcome screen and follow the queue to begin a match.

### Notes on ports and hosting

- The server listens on port 3000 by default. You can change the `port` variable in `server.js` if necessary.
- The WebSocket endpoint is the same origin (the client opens `new WebSocket('/')`). If you host behind a reverse proxy, make sure it supports WebSocket upgrades.

## Usage examples and developer notes

- Player movement: arrow keys. Place bomb with the space bar.
- Chat: type a message in the chat input and press Enter — messages are broadcast to other players.
- Game flow: players join the queue; when there are 2–4 players a countdown starts and the server sends a `startGame` message to clients.

Client state and events (useful for debugging):

- WebSocket messages processed by `src/app/index.js` — look for case handlers for `appendQueue`, `startGame`, `moves`, `boomb`, `powerups`, `newMessage`, `lifes`, and `win`.

## Development

- The project uses no build step for the server. The server expects client files to be present in the repository (see `index.html` and `dist/`).
- If you modify client sources in `src/app/` you will need to rebuild whatever produces `dist/` (this repo assumes `dist/` already contains the runtime). If there is no build pipeline, you can edit `src` files directly and serve them unbundled for testing.

## Where to get help

- Check the code in `src/app/` and `server.js` for implementation details.
- For issues and feature requests, open a GitHub Issue in this repository.
- If you need to discuss design or contribute larger changes, open an issue first to propose the approach.

## Contributing

Contributions are welcome. To keep the README concise the repository should include a `CONTRIBUTING.md` file for detailed contribution guidelines — if it doesn't exist yet, create one and link it at `CONTRIBUTING.md` or `docs/CONTRIBUTING.md`.

Guidelines summary:

- Fork the repo, create a feature branch, and open a pull request.
- Keep changes small and focused. Provide tests or manual verification steps when possible.
- Mention in the PR any changes that affect the client-server protocol (WebSocket message types) so integrations remain compatible.

See `CONTRIBUTING.md` for full guidelines.

## Maintainers

- Maintainer: kill-ux (owner of this repository)

If you want to add yourself as a contributor, open a PR and add an entry to `AUTHORS` or update this section.

## License

See the `LICENSE` file in the repository for license details.

---

If anything in this README is incorrect or outdated, please open an issue describing the missing or incorrect information and provide a patch if possible.
