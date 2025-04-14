import { SimpleJS } from "../../dist/index.js";
import { height, width } from "../App.js";

export class Player {
    constructor(x, y, speed) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.loop = 0;
        this.slowFrames = 5;
        this.slow = 0;
        this.frames = [1, 2, 3, 4];
        this.moveLeft = false;
        this.moveDown = false;
        this.moveUp = false;
        this.moveRight = false;
        this.rowBot = 0;
        this.rowTop = 0;
        this.colBot = 0;
        this.colTop = 0;
        this.deathTime = 2
        this.deathCounter = 0
    }

    initBomberMan(map) {
        let div = SimpleJS.createElement('div', {
            class: 'bomber-man',
            onkeydown: (e) => {
                console.log(e)
                // this.movePlayer
            },
            onkeyup: this.stopPlayer
        }, [
            SimpleJS.createElement("img", {
                style: `background-image:url(assets/hitler.png);
                        background-size:${4 * width}px ${8 * height}px;
                        width:${width}px;
                        height:${height}px;
                        transform:translate(${this.x}px, ${this.y}px)`
            })
        ]);
        map.children.push(div);
        return div;
    }
    movePlayer = (e) => {
        let key = e.key.toLowerCase();
        console.log(key,"eeeeeeeeeeeeeeee");
        
        switch (key) {
            case "p":
                if (!pause) pause = true;
                else pause = false;
                Displaymenu(map);
                break;
            case "x":
                if (!pause) {
                    flames = bomb.putTheBomb(player.x, player.y, map);
                }
                break;
            case "arrowup":
                player.moveUp = true;
                break;
            case "arrowdown":
                player.moveDown = true;
                break;
            case "arrowleft":
                player.moveLeft = true;
                break;
            case "arrowright":
                player.moveRight = true;
                break;
        }
    };

    stopPlayer = (e) => {
        let key = e.key.toLowerCase();
        switch (key) {
            case "arrowup":
                player.moveUp = false;
                break;
            case "arrowdown":
                player.moveDown = false;
                break;
            case "arrowleft":
                player.moveLeft = false;
                break;
            case "arrowright":
                player.moveRight = false;
                break;
        }
    };
}