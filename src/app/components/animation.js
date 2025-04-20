import { SimpleJS } from "../../dist/index.js";
import { height, size, width } from "../App.js";
import { ws } from "../index.js";
import { checkDownMove, checkIfBombed, checkLeftMove, checkRightMove, checkUpperMove, getPosImg } from "./checker.js";
import { death } from "./helpers.js";
import { checkMonsterMove, randomMonsterDir } from "./monsters.js";

export const animateMovement = (time) => {
	if (!SimpleJS.state.pause) {

		const grids = SimpleJS.state.grids
		let player = SimpleJS.state.players[SimpleJS.state.playerName].pObj
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
				// getPosImg(player.frames[player.loop], 4, player.bomberman.current);
				if (!checkObj[0]) {
					player.y += player.speed;
				}
				break;
			case player.moveLeft:
				player.rowBot = Math.floor(player.y / height);
				player.rowTop = Math.ceil(player.y / height);
				player.colBot = Math.floor((player.x - player.speed) / width);
				player.colTop = Math.ceil((player.x - player.speed) / width);
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
				break;
			case player.moveUp:
				player.rowBot = Math.floor((player.y - player.speed) / height);
				player.colBot = Math.floor(player.x / width);
				player.colTop = Math.ceil(player.x / width);
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
				break;
			case player.moveRight:
				player.rowBot = Math.floor(player.y / height);
				player.rowTop = Math.ceil(player.y / height);
				player.colTop = Math.ceil((player.x + player.speed) / width);

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
				break;
			default:
				// getPosImg(1, 4, player.bomberman.current);
		}
		if (player.bomberman.current) {
			const copy = player.bomberman.current.style.transform
			Object.values(SimpleJS.state.players).forEach(({pObj})=>{
				getPosImg(pObj.frames[pObj.loop], 3, pObj.bomberman.current);
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
						getPosImg(1, 4, pObj.bomberman.current);
					}



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
				

			})
			if (copy != `translate(${player.x}px, ${player.y}px)`) {
				//move players
				// Object.values(SimpleJS.state.players).forEach(({pObj})=>{
				// 	pObj.bomberman.current.style.transform = `translate(${pObj.x}px, ${pObj.y}px)`;

				// })
				// player.bomberman.current.style.transform = `translate(${player.x}px, ${player.y}px)`;

				ws.send(JSON.stringify({ type: "moves", playerName: SimpleJS.state.playerName, playerX: player.x/size, playerY: player.y/size, moveRight:player.moveRight, moveUp:player.moveUp, moveDown:player.moveDown, moveLeft:player.moveLeft}))
			}

		}
		// if (player.slow >= player.slowFrames) {
		// 	if (player.loop < player.frames.length - 1) {
		// 		player.loop++;
		// 	} else {
		// 		player.loop = 0;
		// 	}
		// 	player.slow = 0;
		// } else {
		// 	player.slow++;
		// }

		/*--- Start Monster Move ---*/
		SimpleJS.state.monsters.forEach((enemy) => {
			if (!checkMonsterMove(enemy, grids)) {
				// let div = document.querySelector(`.monster-${enemy.id}`);
				let div = enemy.monsterDiv.current;
				if (checkIfBombed(grids, enemy.x, enemy.y)) {
					SimpleJS.setState((prev) => ({
						...prev,
						monsters: prev.monsters.filter((monster) => monster.id !== enemy.id)
					}))
					// map.removeChild(div);
					// monsters = monsters.filter((monster) => monster.id !== enemy.id);
					// currentScore += 100;
					// enemiesTotal--;
					// enemies.innerText = enemiesTotal;
					// score.innerText = currentScore;
				}
				if (div) {
					switch (enemy.dir) {
						case "up":
							enemy.y -= enemy.speed;
							getPosImg(enemy.frames[enemy.loop], 4, div);
							break;
						case "down":
							enemy.y += enemy.speed;
							getPosImg(enemy.frames[enemy.loop], 2, div);
							break;
						case "left":
							enemy.x -= enemy.speed;
							getPosImg(enemy.frames[enemy.loop], 1, div);
							break;
						case "right":
							enemy.x += enemy.speed;
							getPosImg(enemy.frames[enemy.loop], 3, div);
							break;
					}
					if (enemy.slow >= player.slowFrames) {
						if (enemy.loop < player.frames.length - 1) {
							enemy.loop++;
						} else {
							enemy.loop = 0;
						}
						enemy.slow = 0;
					} else {
						enemy.slow++;
					}
					div.style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
					if (
						enemy.x + size / 2 >= player.x &&
						enemy.x <= player.x + size / 2 &&
						enemy.y + size / 2 >= player.y &&
						enemy.y <= player.y + size / 2 &&
						!player.bomberman.current.classList.contains("immune")
					) {
						death(player, SimpleJS.state.monsters, player.bomberman.current);
						// currentLifes--;
						// lifes.innerHTML = currentLifes;
					}
				}
			} else {
				enemy.dir = randomMonsterDir();
			}
		});

		/*--- End Monster Move ---*/

		/*--- player death ---*/
		// if ((currentLifes === 0 || countDown === 0) && !stopAlert) {
		//   stopAlert = true;
		//   alert("You lose!");
		//   location.reload();
		// }
		if (
			checkIfBombed(grids, player.x, player.y) &&
			!player.bomberman.current.classList.contains("immune")
		) {
			death(player, SimpleJS.state.monsters, player.bomberman.current, player.bomberman.current.classList);
			// console.log(bomberman,player.bomberman.current)
			// currentLifes--;
			// lifes.innerHTML = currentLifes;
		}
	}

	requestAnimationFrame(animateMovement);
};
