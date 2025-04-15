import { SimpleJS } from '../dist/index.js'
import { useEffect } from '../dist/utils.js';
import { animateMovement } from './components/animation.js';
import { Bomb } from './components/bomb.js';
import { Board, MapSchema } from './components/map.js';
import { Player } from './components/player.js';

const initWidth = Math.floor(window.innerWidth / MapSchema[0].length / 1.4)
const initHeight = Math.floor(window.innerHeight / MapSchema.length / 1.4)
let size = Math.min(initWidth, initHeight);
export let width = size;
export let height = size;
export let delta = 0.0166
export let player
export let grids = []
export let bomb
export const App = () => {

  useEffect(() => {
    console.log("heeeeeee")
    grids.forEach((grid, i) => {
      grid.forEach((element, j) => {
        grids[i][j] = element.current
      });
    });
    bomb = new Bomb(grids)
    requestAnimationFrame(() => animateMovement())
  }, [])

  const map = SimpleJS.createElement('div', { class: 'map', tabindex: 0, autofocus: true },
    SimpleJS.state.bombs.map(bomb => {
      console.log("bomb")
      return SimpleJS.createElement(
        "div",
        {
          class: `bomb`,
          style: `
                background-image:url(assets/bomb.png);
                background-size : ${width * 3}px ${height}px;
                width : ${width}px;
                height : ${height}px;
                background-position = ${width}px ${height}px;
                position : absolute;
                translate(${bomb.xPos * width}px, ${bomb.yPos * height}px);
            `
        },
        []
      );
    })
  )
  const BoardMap = new Board(map, MapSchema)
  BoardMap.randomizeBricks()
  grids = BoardMap.initLevel(map)
  const playerPos = BoardMap.getPlayerPose()
  player = new Player(playerPos[0] * width, playerPos[1] * height, Math.ceil(size * delta) * 2)
  player.initBomberMan(map)

  return (map)
}

/*
<div class="map"></div>
*/