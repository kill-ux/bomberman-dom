import {SimpleJS} from '../dist/index.js'
import { useEffect } from '../dist/utils.js';
import { animateMovement } from './components/animation.js';
import { Board, MapSchema } from './components/map.js';
import { Player } from './components/player.js';

 const initWidth = Math.floor(window.innerWidth / MapSchema[0].length / 1.4)
 const initHeight = Math.floor(window.innerHeight / MapSchema.length / 1.4)
let size = Math.min(initWidth, initHeight);
export let width = size;
export let height = size;
export let delta = 0.0166
export let player 
export const App = () => {


  useEffect(()=>{
    console.log("heeeeeee")
    requestAnimationFrame(animateMovement)
  },[])
  const map = SimpleJS.createElement('div', {class: 'map', tabindex : 0, autofocus:true},[])
  const BoardMap = new Board(map, MapSchema)
  BoardMap.randomizeBricks()
  BoardMap.initLevel(map)
  const playerPos = BoardMap.getPlayerPose()
  player = new Player(playerPos[0]* width,playerPos[1] * height, Math.ceil(size*delta)*2)
  player.initBomberMan(map)
  
  return (map)
}

/*
<div class="map"></div>
*/