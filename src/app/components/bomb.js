import { SimpleJS } from "../../dist/index.js";
import { height, width } from "../App.js";


export class explotion {
    constructor(x, y, map, id) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.frames = [1, 2, 3, 4, 5];
        this.slowFrames = 5;
        this.slow = 0;
        this.loop = 0;
        this.id = id;
    }
    initExplotion(grids) {
        let currentDiv = grids[this.y][this.x];
        if (!currentDiv.classList.contains("wall")) {
            const fire = document.createElement("div");
            fire.style.backgroundImage = "url(assets/inTheFire.png)";
            fire.style.backgroundSize = `${width * 5}px ${height * 2}px`;
            fire.style.width = `${width}px`;
            fire.style.height = `${height}px`;
            fire.style.backgroundPosition = `${width}px ${height * 2}px`;
            fire.style.position = `absolute`;
            this.map.appendChild(fire);
            fire.style.transform = `translate(${this.x * width}px, ${this.y * height
                }px)`;
            currentDiv.classList.remove("soft-wall");
            currentDiv.classList.contains("wall")
                ? null
                : currentDiv.classList.add("empty");
            currentDiv.classList.add("explotion");
            fire.classList.add(`fire-${this.id}`);
            return [fire, currentDiv];
        }
    }
}



export class Bomb {
    constructor(grids) {
        this.grids = grids;
        this.droped = false;
        this.frames = [1, 2, 3];
        this.loop = 0;
        this.slowFrames = 5;
        this.slow = 0;
        this.explotionTime = 2;
        this.explotionCounter = 0;
        this.removeEffectsTime = 3;
        this.removeEffectsCounter = 0;
    }

    putTheBomb(x, y, map) {
        if (this.droped) return;
        this.droped = true;
        // let bomb = document.createElement("div");
        // bomb.classList.add("bomb");
        // bomb.style.backgroundImage = "url(assets/bomb.png)";
        // bomb.style.backgroundSize = `${width * 3}px ${height}px`;
        // bomb.style.width = `${width}px`;
        // bomb.style.height = `${height}px`;
        // bomb.style.backgroundPosition = `${width}px ${height}px`;
        // bomb.style.position = `absolute`;
        // map.appendChild(bomb);
        let xPos = Math.round(x / width);
        let yPos = Math.round(y / height);
        SimpleJS.setState((prev) => {
            prev.bombs.push({
                xPos,
                yPos
            })
            return prev
        })
        
        // map.children.push(bomb)
        // map.appendChild(bomb);
        
        // bomb.style.transform = `translate(${xPos * width}px, ${yPos * height}px)`;

        let explotions = [];
        console.log(SimpleJS.state.grids[yPos][xPos])
        this.grids[yPos][xPos].classList.add("bomb-wall");
        // let centerEx = new explotion(xPos, yPos, map, 1);
        // let rightEx = new explotion(xPos + 1, yPos, map, 2);
        // let leftEx = new explotion(xPos - 1, yPos, map, 3);
        // let downEx = new explotion(xPos, yPos + 1, map, 4);
        // let upEx = new explotion(xPos, yPos - 1, map, 5);
        // let bombInt = setInterval(() => {
        //     if (!pause) this.explotionCounter++;
        //     if (this.explotionCounter === this.explotionTime) {
        //         this.grids[yPos][xPos].classList.remove("bomb-wall");
        //         map.removeChild(bomb);
        //         this.droped = false;
        //         explotions = [
        //             centerEx.initExplotion(this.grids),
        //             rightEx.initExplotion(this.grids),
        //             leftEx.initExplotion(this.grids),
        //             downEx.initExplotion(this.grids),
        //             upEx.initExplotion(this.grids),
        //         ];
        //         this.droped = false;
        //         this.explotionCounter = 0;
        //         clearInterval(bombInt)
        //     }
        // }, 1000);

        // let effectsInt = setInterval(() => {
        //     if (!pause) this.removeEffectsCounter++;
        //     if (this.removeEffectsTime === this.removeEffectsCounter) {
        //         explotions.forEach((element) => {
        //             if (element != undefined) {
        //                 map.removeChild(element[0]);
        //                 element[1].classList.remove("explotion");
        //             }
        //         });
        //         this.removeEffectsCounter = 0;
        //         clearInterval(effectsInt)
        //     }
        // }, 1000);

        // return [centerEx, upEx, leftEx, rightEx, downEx];
    }
}
