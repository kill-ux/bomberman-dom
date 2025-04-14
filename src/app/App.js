import {SimpleJS} from '../dist/index.js'
import { Board, MapSchema } from './components/map.js';
import { Player } from './components/player.js';

 const initWidth = Math.floor(window.innerWidth / MapSchema[0].length / 1.4)
 const initHeight = Math.floor(window.innerHeight / MapSchema.length / 1.4)
let size = Math.min(initWidth, initHeight);
export let width = size;
export let height = size;
export let delta = 0.0166

export const App = () => {
  
  const map = SimpleJS.createElement('div', {class: 'map'},[])
  const BoardMap = new Board(map, MapSchema)
  BoardMap.randomizeBricks()
  BoardMap.initLevel(map)
  const playerPos = BoardMap.getPlayerPose()
  const player = new Player(playerPos[0]* width,playerPos[1] * height, Math.ceil(size*delta)*2)
  player.initBomberMan(map)
  
  return (map)
}

/*
<div class="map"></div>
*/