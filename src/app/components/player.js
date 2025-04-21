import { SimpleJS } from '../../dist/index.js'
import { bomb, size } from '../App.js'
import { ws } from '../index.js'

export class Player {
  constructor (x, y, speed) {
    this.startX = x
    this.startY = y
    this.x = x
    this.y = y
    this.speed = speed
    this.loop = 0
    this.slowFrames = 5
    this.slow = 0
    this.frames = [1, 2, 3, 4]
    this.moveLeft = false
    this.moveDown = false
    this.moveUp = false
    this.moveRight = false
    this.rowBot = 0
    this.rowTop = 0
    this.colBot = 0
    this.colTop = 0
    this.deathTime = 2
    this.lifes = 3
    this.deathCounter = 0
    this.bomberman

  }

  initBomberMan (map) {
    //
  }

  movePlayer = (e, map) => {
    let key = e.key.toLowerCase()

    switch (key) {
      case ' ':
        bomb.putTheBomb(this.x, this.y)
        ws.send(
          JSON.stringify({
            type: 'boomb',
            playerName: SimpleJS.state.playerName,
            boombX: this.x / size,
            boombY: this.y / size,
            expCount: bomb.expCount
          })
        )
        break
      case 'arrowup':
        this.moveUp = true
        break
      case 'arrowdown':
        this.moveDown = true
        break
      case 'arrowleft':
        this.moveLeft = true
        break
      case 'arrowright':
        this.moveRight = true
        break
    }
  }

  stopPlayer = (e, map) => {
    let key = e.key.toLowerCase()
    switch (key) {
      case 'arrowup':
        this.moveUp = false
        break
      case 'arrowdown':
        this.moveDown = false
        break
      case 'arrowleft':
        this.moveLeft = false
        break
      case 'arrowright':
        this.moveRight = false
        break
    }
  }
}

export class otherPlayer {
  constructor (x, y, speed) {
    this.startX = x
    this.startY = y
    this.x = x
    this.y = y
    this.speed = speed
    this.loop = 0
    this.slowFrames = 5
    this.slow = 0
    this.frames = [1, 2, 3, 4]
    this.moveLeft = false
    this.moveDown = false
    this.moveUp = false
    this.moveRight = false
    this.rowBot = 0
    this.rowTop = 0
    this.colBot = 0
    this.colTop = 0
    this.deathTime = 2
    this.deathCounter = 0
    this.bomberman
  }
}
