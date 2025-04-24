import { SimpleJS } from "../../dist/index.js";
import { height, size, width } from "../App.js";
import { ws } from "../index.js";

export class Explosion {
  constructor(x, y, id) {
    this.x = x
    this.y = y
    this.id = id
    this.width = width
    this.height = height
    this.remove = false
  }

  initExplosion() {
    if (
      !SimpleJS.state.grids[this.y] ||
      !SimpleJS.state.grids[this.y][this.x]
    ) {
      return null
    }

    const currentCell = SimpleJS.state.grids[this.y][this.x]

    // Skip if it's a wall
    // let oldType = ` ${currentCell.type} `;

    let oldType = currentCell.type
    if (oldType.includes(" wall ")) {
      return { wall: true };
    }

    // Update cell type
    let newType = currentCell.type.replace('soft-wall', 'empty')

    newType = newType.replace('empty', 'empty explosion')

    const power = currentCell.power;
    const id = currentCell?.id;

    // Update state
    SimpleJS.setState(prev => {
      const newGrids = [...prev.grids];
      newGrids[this.y][this.x] = {
        ...newGrids[this.y][this.x],
        type: newType,
        power: power != "" ? `powered-${power}` : ""
      };
      return {
        ...prev,
        grids: newGrids,
        fires: [
          ...prev.fires, {
            x: this.x,
            y: this.y,
            id: this.id
          }],
        powers: (power != "" && !power.startsWith("powered")) ?
          [...prev.powers, { id, image: power, xPos: this.x, yPos: this.y }] :
          [...prev.powers],
      };
    });

    return { x: this.x, y: this.y }
  }
}

export class Bomb {
  constructor(users) {
    this.users = users
    this.dropped = false
    this.explosionTime = 2 // seconds
    this.explosionCounter = 0
    this.removeEffectsTime = 3 // seconds
    this.removeEffectsCounter = 0
    this.bombs = 1
    this.expCount = 1
  }

  putTheBomb(x, y, expCount) {
    const xPos = Math.round(x / width)
    const yPos = Math.round(y / height)

    if (SimpleJS.state.grids[yPos][xPos].type.includes('bomb-wall')) {
      return
    }
    
    if (!this.users) {
      if (this.bombs <= 0) return
      this.bombs--
      ws.send(
        JSON.stringify({
          type: 'boomb',
          playerName: SimpleJS.state.playerName,
          boombX: x / size,
          boombY: y / size,
          expCount
        })
      )
    }

   

    // Add bomb to state
    SimpleJS.setState(prev => {
      const newGrids = [...prev.grids]
      newGrids[yPos][xPos] = {
        ...newGrids[yPos][xPos],
        type: newGrids[yPos][xPos].type + ' bomb-wall'
      }

      return {
        ...prev,
        bombs: [...prev.bombs, { xPos, yPos }],
        grids: newGrids
      }
    })

    // Set explosion timeout
    setTimeout(() => {
      this.explode(xPos, yPos, expCount || this.expCount)
    }, this.explosionTime * 1000)
  }

  explode(xPos, yPos, expCount) {
    if (SimpleJS.state.grids.length === 0) return
    const explosions = [];
    // Add center explosion
    explosions.push(new Explosion(xPos, yPos, 1));

    // Add explosions in all directions up to expCount
    for (let i = 1; i <= expCount; i++) {
      explosions.push(
        new Explosion(xPos + i, yPos, 2), // right
        new Explosion(xPos - i, yPos, 3), // left
        new Explosion(xPos, yPos + i, 4), // down
        new Explosion(xPos, yPos - i, 5)  // up
      );
    }

    // Process explosions with directional awareness
    const processed = {
      right: false,
      left: false,
      down: false,
      up: false
    };


    explosions.forEach(exp => {
      // Skip if direction is already blocked
      if (exp.id === 2 && processed.right) return;
      if (exp.id === 3 && processed.left) return;
      if (exp.id === 4 && processed.down) return;
      if (exp.id === 5 && processed.up) return;

      const res = exp.initExplosion();
      exp.remove = true;
      if (res && res.wall) {
        // Mark direction as blocked if wall is hit
        if (exp.id === 2) processed.right = true;
        if (exp.id === 3) processed.left = true;
        if (exp.id === 4) processed.down = true;
        if (exp.id === 5) processed.up = true;
      }
    });

    // Clean up bomb
    SimpleJS.setState(prev => {
      const newGrids = [...prev.grids]
      newGrids[yPos][xPos] = {
        ...newGrids[yPos][xPos],
        type: newGrids[yPos][xPos].type.replace('bomb-wall', '')
      }

      const newBombs = prev.bombs.filter(
        b => !(b.xPos === xPos && b.yPos === yPos)
      )
      if (!this.users) {
        this.bombs++
      }

      return {
        ...prev,
        bombs: newBombs,
        grids: newGrids
      }
    })

    // Remove explosion effects after delay
    setTimeout(() => {
      this.removeExplosionEffects(explosions, processed);
    }, this.removeEffectsTime * 1000);
  }

  removeExplosionEffects(explosions, processed) {
    SimpleJS.setState(prev => {
      const newGrids = [...prev.grids]
      const newFires = [...(prev.fires || [])]

      explosions.forEach(exp => {
        if (!exp.remove) return;

        if (newGrids[exp.y] && newGrids[exp.y][exp.x]) {
          newGrids[exp.y][exp.x] = {
            ...newGrids[exp.y][exp.x],
            type: newGrids[exp.y][exp.x].type.replace('explosion', '')
          }
        }

        // Remove fire effect
        const fireIndex = newFires.findIndex(
          f => f.x === exp.x && f.y === exp.y
        )
        if (fireIndex !== -1) {
          newFires.splice(fireIndex, 1)
        }
      })

      return {
        ...prev,
        grids: newGrids,
        fires: newFires
      }
    })
  }
}