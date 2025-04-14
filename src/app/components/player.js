import { SimpleJS } from "../../dist/index.js";
import { useRef } from "../../dist/utils.js";
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
        this.bomberman
    }

    initBomberMan(map) {
        const elmentRef = useRef("bomberman")

        let div = SimpleJS.createElement('div', {
            class: 'bomber-man',
            style: `transform:translate(${this.x}px, ${this.y}px)`,
            ref:elmentRef
        }, [
            SimpleJS.createElement("img", {
                style: `background-image:url(assets/hitler.png);
                        background-size:${4 * width}px ${8 * height}px;
                        width:${width}px;
                        height:${height}px;
                        `
            })
        ]);
        map.attrs.onkeydown = this.movePlayer
        map.attrs.onkeyup = this.stopPlayer
        
        map.children.push(div);
        this.bomberman = elmentRef
        return elmentRef;
    }
    movePlayer = (e) => {
        console.log("move player func")
        let key = e.key.toLowerCase();
        
        switch (key) {
            case "p":
                if (!pause) pause = true;
                else pause = false;
                Displaymenu(map);
                break;
            case "x":
                if (!pause) {
                    flames = bomb.putTheBomb(this.x, this.y, map);
                }
                break;
            case "arrowup":
                this.moveUp = true;
                break;
            case "arrowdown":
                this.moveDown = true;
                break;
            case "arrowleft":
                this.moveLeft = true;
                break;
            case "arrowright":
                this.moveRight = true;
                break;
        }
    };

    stopPlayer = (e) => {
        let key = e.key.toLowerCase();
        switch (key) {
            case "arrowup":
                this.moveUp = false;
                break;
            case "arrowdown":
                this.moveDown = false;
                break;
            case "arrowleft":
                this.moveLeft = false;
                break;
            case "arrowright":
                this.moveRight = false;
                break;
        }
    };
}