import { grids, height, player, width } from "../App.js";
import { checkDownMove, checkLeftMove, checkRightMove, checkUpperMove, getPosImg } from "./checker.js";

export const animateMovement = () => {
  // console.log(grids)
  let checkObj;
  console.log(player.moveDown,player.moveLeft,player.moveUp,player.moveRight)
  // console.log(grids)
  switch (true) {
    case player.moveDown:
      console.log(player.moveDown)
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

  requestAnimationFrame(animateMovement);
};
