import { SimpleJS } from "../../dist/index.js";
import { setState } from "../../dist/state.js";
import { bomb, height, size, width } from "../App.js";
import { ws } from "../index.js";
import { checkDownMove, checkIfBombed, checkLeftMove, checkRightMove, checkUpperMove, getPosImg } from "./checker.js";
import { death } from "./helpers.js";

let resetMoves
export const animateMovement = (time) => {
	if (!SimpleJS.state.pause) {

		const grids = SimpleJS.state.grids
		let player = SimpleJS.state.players[SimpleJS.state.playerName].pObj

		if (player.lifes !== 0) {
			let checkObj;
			switch (true) {
				case player.moveDown:
					player.rowBot = Math.floor((player.y + player.speed) / height);
					player.rowTop = Math.ceil((player.y + player.speed) / height);
					player.colBot = Math.floor(player.x / width);
					player.colTop = Math.ceil(player.x / width);

					checkObj = checkDownMove(
						grids,
						player.rowTop,
						player.colBot,
						player.colTop,
						player
					);
					player.x = checkObj[1];
					if (!checkObj[0]) {
						player.y += player.speed;
					}

					clearTimeout(resetMoves)
					break;
				case player.moveLeft:
					player.rowBot = Math.floor(player.y / height);
					player.rowTop = Math.ceil(player.y / height);
					player.colBot = Math.floor((player.x - player.speed) / width);
					player.colTop = Math.ceil((player.x - player.speed) / width);
					// checkPowerUp(grids, player.rowTop, player.colBot, player.colTop)
					checkObj = checkLeftMove(
						grids,
						player.rowBot,
						player.rowTop,
						player.colBot,
						player
					);
					player.y = checkObj[1];
					// getPosImg(player.frames[player.loop], 3, player.bomberman.current);
					if (!checkObj[0]) {
						player.x -= player.speed;
					}

					clearTimeout(resetMoves)
					break;
				case player.moveUp:
					player.rowBot = Math.floor((player.y - player.speed) / height);
					player.colBot = Math.floor(player.x / width);
					player.colTop = Math.ceil(player.x / width);
					// checkPowerUp(grids, player.rowBot, player.colBot, player.colTop)
					checkObj = checkUpperMove(
						grids,
						player.rowBot,
						player.colBot,
						player.colTop,
						player
					);
					player.x = checkObj[1];
					// getPosImg(player.frames[player.loop], 1, player.bomberman.current);
					if (!checkObj[0]) {
						player.y -= player.speed;
					}

					clearTimeout(resetMoves)
					break;
				case player.moveRight:
					player.rowBot = Math.floor(player.y / height);
					player.rowTop = Math.ceil(player.y / height);
					player.colTop = Math.ceil((player.x + player.speed) / width);
					// checkPowerUp(grids, player.rowBot, player.colBot, player.colTop)

					checkObj = checkRightMove(
						grids,
						player.rowBot,
						player.rowTop,
						player.colTop,
						player
					);
					player.y = checkObj[1];
					// getPosImg(player.frames[player.loop], 2, player.bomberman.current);
					if (!checkObj[0]) {
						player.x += player.speed
					}

					clearTimeout(resetMoves)
					break;
				default:
					if (!resetMoves) {
						resetMoves = setTimeout(() => {
							ws.send(JSON.stringify({ type: "moves", playerName: SimpleJS.state.playerName, playerX: player.x / size, playerY: player.y / size, moveRight: player.moveRight, moveUp: player.moveUp, moveDown: player.moveDown, moveLeft: player.moveLeft }))
						}, 50)
					}
				// getPosImg(1, 4, player.bomberman.current);
			}
		}
		if (player.bomberman.current) {
			const copy = player.bomberman.current.style.transform
			Object.values(SimpleJS.state.players).forEach(({ pObj }) => {
				if (pObj.lifes !== 0) {
					let skip = false
					pObj.bomberman.current.style.transform = `translate(${pObj.x}px, ${pObj.y}px)`;

					switch (true) {
						case pObj.moveDown:
							getPosImg(pObj.frames[pObj.loop], 4, pObj.bomberman.current);
							break;
						case pObj.moveLeft:
							getPosImg(pObj.frames[pObj.loop], 3, pObj.bomberman.current);
							break;
						case pObj.moveUp:
							getPosImg(pObj.frames[pObj.loop], 1, pObj.bomberman.current);
							break;
						case pObj.moveRight:
							getPosImg(pObj.frames[pObj.loop], 2, pObj.bomberman.current);
							break;
						default:
							skip = true
					}
					if (!skip) {
						if (pObj.slow >= pObj.slowFrames) {
							if (pObj.loop < pObj.frames.length - 1) {
								pObj.loop++;
							} else {
								pObj.loop = 0;
							}


							pObj.slow = 0;
						} else {
							pObj.slow++;
						}
					}
				}
				else {
					/*--- player death ---*/
					if (pObj.bomberman.current.style.display != "none")
						pObj.bomberman.current.style.display = "none"
				}
			})
			if (copy != `translate(${player.x}px, ${player.y}px)`) {
				
				ws.send(JSON.stringify({ type: "moves", playerName: SimpleJS.state.playerName, playerX: player.x / size, playerY: player.y / size, moveRight: player.moveRight, moveUp: player.moveUp, moveDown: player.moveDown, moveLeft: player.moveLeft }))
			}

		}

		if (player.lifes !== 0 &&
			checkIfBombed(grids, player.x, player.y) &&
			!player.bomberman.current.classList.contains("immune")
		) {
			death(player, SimpleJS.state.monsters, player.bomberman.current, player.bomberman.current.classList);
			ws.send(JSON.stringify({ type: "moves", playerName: SimpleJS.state.playerName, playerX: player.x / size, playerY: player.y / size, moveRight: player.moveRight, moveUp: player.moveUp, moveDown: player.moveDown, moveLeft: player.moveLeft }))

			// console.log(bomberman,player.bomberman.current)

			//player.lifes--;

			SimpleJS.setState((prev) => {
				prev.players[prev.playerName].pObj.lifes--
				return prev
			})
			ws.send(JSON.stringify({ type: "lifes", playerName: SimpleJS.state.playerName, lifes: SimpleJS.state.players[SimpleJS.state.playerName].pObj.lifes }))

		}
	}

	requestAnimationFrame(animateMovement);
};
