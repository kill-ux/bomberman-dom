import { SimpleJS } from '../dist/index.js'
import { useEffect, useState } from '../dist/utils.js';
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
// export let player
export let grids = []
export let bomb


export const App = () => {

	useEffect(() => {
		bomb = new Bomb();
		console.log("jj")
		requestAnimationFrame(() => animateMovement());
	}, []);

	const map = SimpleJS.createElement('div', {
		class: 'map',
		tabindex: 0,
		autofocus: true,
		style: `width:${MapSchema[0].length * width}px;height:${MapSchema.length * height}px`
	}, [
		// Render grid cells
		...SimpleJS.state.grids.flatMap((row, i) => {
			return row.map((cell, j) =>
				SimpleJS.createElement('div', {
					class: `grid-cell ${cell.type}`,
					style: `image-rendering:pixelated;
							width:${width}px;
							height:${height}px;`,
				})
			)
		}

		),
		// Render bombs
		...SimpleJS.state.bombs.map(bomb =>
			SimpleJS.createElement('div', {
				class: 'bomb',
				style: `
                background-image:url(assets/bomb.png);
                background-size:${width * 3}px ${height}px;
                width:${width}px;
                height:${height}px;
                position:absolute;
                transform:translate(${bomb.xPos * width}px, ${bomb.yPos * height}px);
            `
			})
		),
		// Player will be added separately

	]);

	const BoardMap = new Board(map, MapSchema)
	if (SimpleJS.state.grids.length == 0) {
		useEffect(() => {
			BoardMap.randomizeBricks()
			grids = BoardMap.initLevel(map)
			SimpleJS.state.initialized = true
		})	
	}

	if (!SimpleJS.state.initialized) {
		const playerPos = BoardMap.getPlayerPose()
		SimpleJS.state.player = new Player(playerPos[0] * width, playerPos[1] * height, Math.ceil(size * delta) * 2)
		SimpleJS.state.player.initBomberMan(map)
	}
	console.log(SimpleJS.state.player)

	return (map)
}

/*
<div class="map"></div>
*/