import { SimpleJS } from "../../dist/index.js";
import { useRef } from "../../dist/utils.js";
import { delta, height, width } from "../App.js";

export class Monster {
  constructor(x, y, id, dir, speed, monsterDiv) {
    this.startX = x;
    this.startY = y;
    this.x = x * width;
    this.y = y * height;
    this.id = id;
    this.dir = dir;
    this.loop = 0;
    this.slow = 0;
    this.speed = speed;
    this.frames = [1, 2, 3];
    this.rowBot = 0;
    this.rowTop = 0;
    this.colBot = 0;
    this.colTop = 0;
    this.monsterDiv = monsterDiv
  }
  initMonsters(enemiesTotal, bluePrint, map) {
    const monsters = [];
    for (let i = 0; i < enemiesTotal; i++) {
      const row = Math.floor(Math.random() * bluePrint.length);
      const col = Math.floor(Math.random() * bluePrint[0].length);
      if (bluePrint[row][col] === 0) {
        const monsterDiv = useRef(`monster-${i}`)
        let currentMonster = new Monster(
          col,
          row,
          i,
          randomMonsterDir(),
          Math.ceil(width * delta),
          monsterDiv
        );
        monsters.push(currentMonster);
      } else {
        i--;
      }
    }
    return monsters;
  }
}

export const randomMonsterDir = () => {
  const directions = ["left", "up", "down", "right"];
  return directions[Math.floor(directions.length * Math.random())];
};


export const checkMonsterMove = (enemy, grids) => {
  switch (enemy.dir) {
    case "up":
      enemy.rowBot = Math.floor((enemy.y - enemy.speed) / height);
      enemy.colBot = Math.floor(enemy.x / width);
      enemy.colTop = Math.ceil(enemy.x / width);
      return (
        grids[enemy.rowBot][enemy.colBot].type.includes("wall") ||
        grids[enemy.rowBot][enemy.colBot].type.includes("soft-wall") ||
        grids[enemy.rowBot][enemy.colTop].type.includes("wall") ||
        grids[enemy.rowBot][enemy.colTop].type.includes("soft-wall") ||
        grids[enemy.rowBot][enemy.colTop].type.includes("bomb-wall") ||
        grids[enemy.rowBot][enemy.colBot].type.includes("bomb-wall")
      );
    case "down":
      enemy.rowBot = Math.floor((enemy.y + enemy.speed) / height);
      enemy.rowTop = Math.ceil((enemy.y + enemy.speed) / height);
      enemy.colBot = Math.floor(enemy.x / width);
      enemy.colTop = Math.ceil(enemy.x / width);
      return (
        grids[enemy.rowTop][enemy.colBot].type.includes("wall") ||
        grids[enemy.rowTop][enemy.colBot].type.includes("soft-wall") ||
        grids[enemy.rowTop][enemy.colTop].type.includes("wall") ||
        grids[enemy.rowTop][enemy.colTop].type.includes("soft-wall") ||
        grids[enemy.rowTop][enemy.colBot].type.includes("bomb-wall") ||
        grids[enemy.rowTop][enemy.colTop].type.includes("bomb-wall")
      );

    case "right":
      enemy.rowBot = Math.floor(enemy.y / height);
      enemy.rowTop = Math.ceil(enemy.y / height);
      enemy.colBot = Math.floor((enemy.x + enemy.speed) / width);
      enemy.colTop = Math.ceil((enemy.x + enemy.speed) / width);
      return (
        grids[enemy.rowBot][enemy.colTop].type.includes("wall") ||
        grids[enemy.rowBot][enemy.colTop].type.includes("soft-wall") ||
        grids[enemy.rowTop][enemy.colTop].type.includes("wall") ||
        grids[enemy.rowTop][enemy.colTop].type.includes("soft-wall") ||
        grids[enemy.rowBot][enemy.colTop].type.includes("bomb-wall") ||
        grids[enemy.rowTop][enemy.colTop].type.includes("bomb-wall")
      );
    case "left":
      enemy.rowBot = Math.floor(enemy.y / height);
      enemy.rowTop = Math.ceil(enemy.y / height);
      enemy.colBot = Math.floor((enemy.x - enemy.speed) / width);
      enemy.colTop = Math.ceil((enemy.x - enemy.speed) / width);
      return (
        grids[enemy.rowTop][enemy.colBot].type.includes("wall") ||
        grids[enemy.rowTop][enemy.colBot].type.includes("soft-wall") ||
        grids[enemy.rowBot][enemy.colBot].type.includes("wall") ||
        grids[enemy.rowBot][enemy.colBot].type.includes("soft-wall") ||
        grids[enemy.rowTop][enemy.colBot].type.includes("bomb-wall") ||
        grids[enemy.rowBot][enemy.colBot].type.includes("bomb-wall")
      );
  }
};