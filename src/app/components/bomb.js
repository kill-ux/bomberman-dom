// import { SimpleJS } from "../../dist/index.js";
// import { height, width } from "../App.js";


// export class explosion {
//     constructor(x, y, map, id) {
//         this.map = map;
//         this.x = x;
//         this.y = y;
//         this.height = height;
//         this.width = width;
//         this.frames = [1, 2, 3, 4, 5];
//         this.slowFrames = 5;
//         this.slow = 0;
//         this.loop = 0;
//         this.id = id;
//     }
//     initExplotion(grids) {
//         let currentDiv = grids[this.y][this.x];
//         // console.log(currentDiv)
//         // if (!currentDiv.classList.contains("wall")) {
//         //     const fire = document.createElement("div");
//         //     fire.style.backgroundImage = "url(assets/inTheFire.png)";
//         //     fire.style.backgroundSize = `${width * 5}px ${height * 2}px`;
//         //     fire.style.width = `${width}px`;
//         //     fire.style.height = `${height}px`;
//         //     fire.style.backgroundPosition = `${width}px ${height * 2}px`;
//         //     fire.style.position = `absolute`;
//         //     this.map.appendChild(fire);
//         //     fire.style.transform = `translate(${this.x * width}px, ${this.y * height
//         //         }px)`;
//         //     currentDiv.classList.remove("soft-wall");
//         //     currentDiv.classList.contains("wall")
//         //         ? null
//         //         : currentDiv.classList.add("empty");
//         //     currentDiv.classList.add("explosion");
//         //     fire.classList.add(`fire-${this.id}`);
//         //     return [fire, currentDiv];
//         // }

//         if (!currentDiv.type.contains("wall")) {
//             // const fire = SimpleJS.createElement("div", {
//             //     class: 'bomber-man',
//             //     style: `background-image:url(assets/inTheFire.png);
//             //         background-size:${width * 5}px ${height * 2}px;
//             //         width:${width}px;
//             //         height:${height}px;
//             //         background-position:${width}px ${height * 2}px;
//             //         position:absolute;
//             //         transform:translate(${this.x * width}px, ${this.y * height}px);
//             //         `,
//             // }, []);
//             SimpleJS.state.fires.push({ x: this.x, y: this.y, id: this.id })
//             // fire.style.backgroundImage = "url(assets/inTheFire.png)";
//             // fire.style.backgroundSize = `${width * 5}px ${height * 2}px`;
//             // fire.style.width = `${width}px`;
//             // fire.style.height = `${height}px`;
//             // fire.style.backgroundPosition = `${width}px ${height * 2}px`;
//             // fire.style.position = `absolute`;
//             // this.map.appendChild(fire);
//             // fire.style.transform = `translate(${this.x * width}px, ${this.y * height
//             //     }px)`;

//             currentDiv.type.replace("soft-wall", "")
//             currentDiv.type.contains("wall")
//                 ? null
//                 : currentDiv.type = `${currentDiv.type} empty`
//             currentDiv.type = `${currentDiv.type} explosion`
//             // fire.classList.add(`fire-${this.id}`);
//             SimpleJS.setState(prev => prev)
//             return [fire, currentDiv];
//         }
//     }
// }



// export class Bomb {
//     constructor(grids) {
//         this.grids = grids;
//         this.droped = false;
//         this.frames = [1, 2, 3];
//         this.loop = 0;
//         this.slowFrames = 5;
//         this.slow = 0;
//         this.explotionTime = 2;
//         this.explotionCounter = 0;
//         this.removeEffectsTime = 3;
//         this.removeEffectsCounter = 0;
//     }

//     putTheBomb(x, y, map) {
//         if (this.droped) return;
//         this.droped = true;
//         // let bomb = document.createElement("div");
//         // bomb.classList.add("bomb");
//         // bomb.style.backgroundImage = "url(assets/bomb.png)";
//         // bomb.style.backgroundSize = `${width * 3}px ${height}px`;
//         // bomb.style.width = `${width}px`;
//         // bomb.style.height = `${height}px`;
//         // bomb.style.backgroundPosition = `${width}px ${height}px`;
//         // bomb.style.position = `absolute`;
//         // map.appendChild(bomb);
//         let xPos = Math.round(x / width);
//         let yPos = Math.round(y / height);
//         SimpleJS.setState((prev) => {
//             prev.bombs.push({
//                 xPos,
//                 yPos
//             })
//             return prev
//         })

//         // map.children.push(bomb)
//         // map.appendChild(bomb);

//         // bomb.style.transform = `translate(${xPos * width}px, ${yPos * height}px)`;

//         let explotions = [];
//         console.log(SimpleJS.state.grids[yPos][xPos])
//         // this.grids[yPos][xPos].classList.add("bomb-wall");
//         SimpleJS.state.grids[yPos][xPos].type = `${SimpleJS.state.grids[yPos][xPos].type} bomb-wall`
//         let centerEx = new explosion(xPos, yPos, map, 1);
//         let rightEx = new explosion(xPos + 1, yPos, map, 2);
//         let leftEx = new explosion(xPos - 1, yPos, map, 3);
//         let downEx = new explosion(xPos, yPos + 1, map, 4);
//         let upEx = new explosion(xPos, yPos - 1, map, 5);


//         let bombInt = setInterval(() => {
//             // if (!pause) this.explotionCounter++;
//             // if (this.explotionCounter === this.explotionTime) {
//             SimpleJS.state.grids[yPos][xPos].type.replace("bomb-wall", "")
//             console.log("grids[yPos][xPos].type => ", SimpleJS.state.grids[yPos][xPos].type)
//             // map.removeChild(bomb);
//             // SimpleJS.setState((prev) => {
//             //     return prev.bombs.filter((bomb) => !(bomb.xPos == xPos && bomb.yPos == yPos))
//             // })
//             // this.droped = false;
//             // explotions = [
//             //     centerEx.initExplotion(this.grids),
//             //     rightEx.initExplotion(this.grids),
//             //     leftEx.initExplotion(this.grids),
//             //     downEx.initExplotion(this.grids),
//             //     upEx.initExplotion(this.grids),
//             // ];
//             // this.droped = false;
//             // this.explotionCounter = 0;
//             clearInterval(bombInt)
//             // }
//         }, 1000);

//         // let effectsInt = setInterval(() => {
//         //     if (!pause) this.removeEffectsCounter++;
//         //     if (this.removeEffectsTime === this.removeEffectsCounter) {
//         //         explotions.forEach((element) => {
//         //             if (element != undefined) {
//         //                 map.removeChild(element[0]);
//         //                 element[1].classList.remove("explosion");
//         //             }
//         //         });
//         //         this.removeEffectsCounter = 0;
//         //         clearInterval(effectsInt)
//         //     }
//         // }, 1000);

//         // return [centerEx, upEx, leftEx, rightEx, downEx];


//         // let bombInt = setInterval(() => {
//         //     // if (!pause) this.explotionCounter++;
//         //     if (this.explotionCounter === this.explotionTime) {
//         //         this.grids[yPos][xPos].classList.remove("bomb-wall");
//         //         map.removeChild(bomb);
//         //         this.droped = false;
//         //         explotions = [
//         //             centerEx.initExplotion(this.grids),
//         //             rightEx.initExplotion(this.grids),
//         //             leftEx.initExplotion(this.grids),
//         //             downEx.initExplotion(this.grids),
//         //             upEx.initExplotion(this.grids),
//         //         ];
//         //         this.droped = false;
//         //         this.explotionCounter = 0;
//         //         clearInterval(bombInt)
//         //     }
//         // }, 1000);
//     }
// }


import { SimpleJS } from "../../dist/index.js";
import { height, width } from "../App.js";

export class Explosion {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.width = width;
        this.height = height;
    }

    initExplosion() {
        if (!SimpleJS.state.grids[this.y] || !SimpleJS.state.grids[this.y][this.x]) {
            return null;
        }

        const currentCell = SimpleJS.state.grids[this.y][this.x];

        // console.log(currentCell)

        // Skip if it's a wall
        let oldType = ` ${currentCell.type} `
        if (oldType.includes(" wall ")) {
            return null;
        }
        // console.log("#")

        // Update cell type
        let newType = currentCell.type
            .replace("soft-wall", "")
            .trim();

        newType = ` ${newType} `
        if (!newType.includes("wall") && !newType.includes("empty")) {
            newType = "empty";
        } else {
            newType += " explosion";
        }

        // Update state
        SimpleJS.setState(prev => {
            const newGrids = [...prev.grids];
            newGrids[this.y][this.x] = {
                ...newGrids[this.y][this.x],
                type: newType
            };
            return {
                ...prev,
                grids: newGrids,
                fires: [
                    ...prev.fires, {
                        x: this.x,
                        y: this.y,
                        id: this.id
                    }]
            };
        });

        return { x: this.x, y: this.y };
    }
}

export class Bomb {
    constructor() {
        this.dropped = false;
        this.explosionTime = 2; // seconds
        this.explosionCounter = 0;
        this.removeEffectsTime = 3; // seconds
        this.removeEffectsCounter = 0;
    }

    putTheBomb(x, y) {
        if (this.dropped) return;
        this.dropped = true;

        const xPos = Math.round(x / width);
        const yPos = Math.round(y / height);

        // Add bomb to state
        SimpleJS.setState(prev => {
            const newGrids = [...prev.grids];
            newGrids[yPos][xPos] = {
                ...newGrids[yPos][xPos],
                type: newGrids[yPos][xPos].type + " bomb-wall"
            };

            return {
                ...prev,
                bombs: [...prev.bombs, { xPos, yPos }],
                grids: newGrids
            };
        });

        // Set explosion timeout
        let t
        const time = setInterval(() => {
            if (SimpleJS.state.pause) return
            this.explode(xPos, yPos);
            clearInterval(time)
        }, this.explosionTime * 1000);;
    }

    explode(xPos, yPos) {
        // Create explosions
        const explosions = [
            new Explosion(xPos, yPos, 1),  // center
            new Explosion(xPos + 1, yPos, 2),  // right
            new Explosion(xPos - 1, yPos, 3),  // left
            new Explosion(xPos, yPos + 1, 4),  // down
            new Explosion(xPos, yPos - 1, 5)   // up
        ];

        // console.log(explosions)

        // Initialize explosions
        explosions.forEach(exp => exp.initExplosion());

        // Clean up bomb
        SimpleJS.setState(prev => {
            const newGrids = [...prev.grids];
            newGrids[yPos][xPos] = {
                ...newGrids[yPos][xPos],
                type: newGrids[yPos][xPos].type.replace("bomb-wall", "").trim()
            };

            const newBombs = prev.bombs.filter(b =>
                !(b.xPos === xPos && b.yPos === yPos)
            );
            this.dropped = false

            return {
                ...prev,
                bombs: newBombs,
                grids: newGrids,
                dropped: false
            };
        });

        // Remove explosion effects after delay
        const time = setInterval(() => {
            if (SimpleJS.state.pause) return
            this.removeExplosionEffects(explosions);
            clearInterval(time)
        }, this.removeEffectsTime * 1000);
    }

    removeExplosionEffects(explosions) {
        SimpleJS.setState(prev => {
            const newGrids = [...prev.grids];
            const newFires = [...(prev.fires || [])];

            explosions.forEach(exp => {
                if (newGrids[exp.y] && newGrids[exp.y][exp.x]) {
                    newGrids[exp.y][exp.x] = {
                        ...newGrids[exp.y][exp.x],
                        type: newGrids[exp.y][exp.x].type.replace("explosion", "").trim()
                    };
                }

                // Remove fire effect
                const fireIndex = newFires.findIndex(f =>
                    f.x === exp.x && f.y === exp.y
                );
                if (fireIndex !== -1) {
                    newFires.splice(fireIndex, 1);
                }
            });

            return {
                ...prev,
                grids: newGrids,
                fires: newFires
            };
        });
    }
}