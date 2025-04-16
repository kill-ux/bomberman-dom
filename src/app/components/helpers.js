import { SimpleJS } from "../../dist/index.js";
import { height, width } from "../App.js";

export const death = (player, monsters, bomberman) => {
    bomberman.classList.add('immune')
    setTimeout(() => {
        if (!SimpleJS.state.pause) player.deathCounter++
        // player.deathCounter++
        // if (player.deathCounter == player.deathTime) {
            bomberman.classList.remove('immune')
            player.deathCounter = 0
        // }
    }, 2000)
    monsters.forEach((mn) => {
        mn.x = mn.startX * width;
        mn.y = mn.startY * height;
    });
    player.x = player.startX;
    player.y = player.startY;
    return bomberman
};