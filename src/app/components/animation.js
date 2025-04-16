import { SimpleJS } from "../../dist/index.js";
import { height, monsters, size, width } from "../App.js";
import { checkDownMove, checkLeftMove, checkRightMove, checkUpperMove, getPosImg } from "./checker.js";
import { checkMonsterMove, randomMonsterDir } from "./monsters.js";

export const animateMovement = (time) => {
  const grids = SimpleJS.state.grids
  let player = SimpleJS.state.player
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
      getPosImg(player.frames[player.loop], 8, player.bomberman.current);
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
      getPosImg(player.frames[player.loop], 7, player.bomberman.current);
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
      getPosImg(player.frames[player.loop], 5, player.bomberman.current);
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
      getPosImg(player.frames[player.loop], 6, player.bomberman.current);
      if (!checkObj[0]) {
        player.x += player.speed
      }
      break;
  }

  player.bomberman.current.style.transform = `translate(${player.x}px, ${player.y}px)`;
  if (player.slow >= player.slowFrames) {
    if (player.loop < player.frames.length - 1) {
      player.loop++;
    } else {
      player.loop = 0;
    }
    player.slow = 0;
  } else {
    player.slow++;
  }

  /*--- Start Monster Move ---*/
  monsters.forEach((enemy) => {
    if (!checkMonsterMove(enemy, grids)) {
      // let div = document.querySelector(`.monster-${enemy.id}`);
      let div = enemy.monsterDiv.current;
      // if (checkIfBombed(grids, enemy.x, enemy.y)) {
      //   map.removeChild(div);
      //   monsters = monsters.filter((monster) => monster.id !== enemy.id);
      //   currentScore += 100;
      //   enemiesTotal--;
      //   enemies.innerText = enemiesTotal;
      //   score.innerText = currentScore;
      // }
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
          enemy.x + size/2 >= player.x &&
          enemy.x <= player.x + size/2 &&
          enemy.y + size/2 >= player.y &&
          enemy.y <= player.y + size/2 &&
          !player.bomberman.current.classList.contains("immune")
        ) {
          death(player, monsters, player.bomberman.current);
          currentLifes--;
          lifes.innerHTML = currentLifes;
        }
      }
    } else {
      enemy.dir = randomMonsterDir();
    }
  });

  /*--- End Monster Move ---*/


  requestAnimationFrame(animateMovement);
};
