import { SimpleJS } from '../../dist/index.js'
import { height, width } from '../App.js'

export class Explosion {
  constructor (x, y, id) {
    this.x = x
    this.y = y
    this.id = id
    this.width = width
    this.height = height
  }

  initExplosion () {
    if (
      !SimpleJS.state.grids[this.y] ||
      !SimpleJS.state.grids[this.y][this.x]
    ) {
      return null
    }

    const currentCell = SimpleJS.state.grids[this.y][this.x]

    // Skip if it's a wall
    let oldType = ` ${currentCell.type} `
    if (oldType.includes(' wall ')) {
      return null
    }

    // Update cell type
    let newType = currentCell.type.replace('soft-wall', 'empty').trim()

    newType = newType.replace('empty', 'empty explosion').trim()

    // const powers = SimpleJS.state.powers

    const power = currentCell.power
    const id = currentCell?.id

    // Update state
    SimpleJS.setState(prev => {
      const newGrids = [...prev.grids]
      newGrids[this.y][this.x] = {
        ...newGrids[this.y][this.x],
        type: newType,
        power: power != '' ? `powered-${power}` : ''
      }
      return {
        ...prev,
        grids: newGrids,
        fires: [
          ...prev.fires,
          {
            x: this.x,
            y: this.y,
            id: this.id
          }
        ],
        powers:
          power != '' && !power.startsWith('powered')
            ? [...prev.powers, { id, image: power, xPos: this.x, yPos: this.y }]
            : [...prev.powers]
      }
    })
    // if (currentCell.power != "") {
    //     currentCell.power
    // }

    return { x: this.x, y: this.y }
  }
}

export class Bomb {
  constructor (users) {
    this.users = users
    this.dropped = false
    this.explosionTime = 2 // seconds
    this.explosionCounter = 0
    this.removeEffectsTime = 3 // seconds
    this.removeEffectsCounter = 0
    this.bombs = 1
    this.expCount = 1
  }

  putTheBomb (x, y, expCount) {
    if (!this.users) {
      if (this.bombs <= 0) return
      this.bombs--
    }

    const xPos = Math.round(x / width)
    const yPos = Math.round(y / height)

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
    const time = setInterval(() => {
      this.explode(xPos, yPos, expCount || this.expCount)
      clearInterval(time)
    }, this.explosionTime * 1000)
  }

  explode (xPos, yPos, expCount) {
    // Create explosions
    // const explosions = [
    //     new Explosion(xPos, yPos, 1),  // center
    //     new Explosion(xPos + 1, yPos, 2),  // right
    //     new Explosion(xPos - 1, yPos, 3),  // left
    //     new Explosion(xPos, yPos + 1, 4),  // down
    //     new Explosion(xPos, yPos - 1, 5)   // up
    // ];
    const explosions = []
    for (let index = 1; index <= expCount; index++) {
      explosions.push(
        new Explosion(xPos, yPos, 1),
        new Explosion(xPos + index, yPos, 2),
        new Explosion(xPos - index, yPos, 3),
        new Explosion(xPos, yPos + index, 4),
        new Explosion(xPos, yPos - index, 5)
      )
    }

    // console.log(explosions)

    // Initialize explosions
    explosions.forEach(exp => exp.initExplosion())

    // Clean up bomb
    SimpleJS.setState(prev => {
      const newGrids = [...prev.grids]
      newGrids[yPos][xPos] = {
        ...newGrids[yPos][xPos],
        type: newGrids[yPos][xPos].type.replace('bomb-wall', '').trim()
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
    const time = setInterval(() => {
      // if (SimpleJS.state.pause) return
      this.removeExplosionEffects(explosions)
      clearInterval(time)
    }, this.removeEffectsTime * 1000)
  }

  removeExplosionEffects (explosions) {
    SimpleJS.setState(prev => {
      const newGrids = [...prev.grids]
      const newFires = [...(prev.fires || [])]

      explosions.forEach(exp => {
        if (newGrids[exp.y] && newGrids[exp.y][exp.x]) {
          newGrids[exp.y][exp.x] = {
            ...newGrids[exp.y][exp.x],
            type: newGrids[exp.y][exp.x].type.replace('explosion', '').trim()
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
