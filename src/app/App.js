import { SimpleJS } from '../dist/index.js'
import { useEffect, useRef, useState } from '../dist/utils.js';
import { animateMovement } from './components/animation.js';
import { Bomb } from './components/bomb.js';
import { Board, MapSchema } from './components/map.js';
import { menu } from './components/menu.js';
import { Monster } from './components/monsters.js';
import { Player } from './components/player.js';

const initWidth = Math.floor(window.innerWidth / MapSchema[0].length / 1.4)
const initHeight = Math.floor(window.innerHeight / MapSchema.length / 1.4)
export let size = Math.min(initWidth, initHeight);
export let width = size;
export let height = size;
export let delta = 0.0166
// export let player
export let grids = []
export let bomb
export const totalMonsters = 5
export let monsters

export const App = () => {

	const elmentRef = useRef("bomberman")
	const map = SimpleJS.createElement('div', {
		class: 'map',
		tabindex: 0,
		autofocus: true,
		style: `width:${MapSchema[0].length * width}px;height:${MapSchema.length * height}px`,
		onkeydown: (e) => SimpleJS.state.player?.movePlayer(e, map),
		onkeyup: (e) => SimpleJS.state.player?.stopPlayer(e, map)
	}, [
		// Player will be added separately
		SimpleJS.state.player ? SimpleJS.createElement('div', {
			class: 'bomber-man',
			style: `background-image:url(assets/hitler.png);
            background-size:${4 * width}px ${8 * height}px;
            width:${width}px;
            height:${height}px;
            transform:translate(${SimpleJS.state.player.x}px, ${SimpleJS.state.player.y}px);
            `,
			ref: elmentRef,
		}) : "",

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
		)
		,
		// Render fires
		...SimpleJS.state.fires.map(fire =>
			SimpleJS.createElement("div", {
				class: `fire-${fire.id}`,
				style: `background-image:url(assets/inTheFire.png);
                    background-size:${width}px ${height}px;
                    width:${width}px;
                    height:${height}px;
                    background-position:${width}px ${height * 2}px;
                    position:absolute;
                    transform:translate(${fire.x * width}px, ${fire.y * height}px);
                    `,
			}, [])
		),

		//Render Monsters
		...SimpleJS.state.monsters.map(monster => {
			return SimpleJS.createElement("div", {
				class: `monster monster-${monster.id}`,
				ref: monster.monsterDiv,
				style: `width:${width}px;
				height:${height}px;
				position:absolute;
				image-rendering:pixelated;
				background-image:url(assets/skull.png);
				background-size:${3 * width}px ${4 * height}px;
				transform:translate(${monster.x}px, ${monster.y}px);`
			})
		})
	]);

	const BoardMap = new Board(map, MapSchema)
	if (SimpleJS.state.grids.length == 0) {
		useEffect(() => {
			// console.log("hhh")
			const playerPos = BoardMap.getPlayerPose()
			SimpleJS.state.player = new Player(playerPos[0] * width, playerPos[1] * height, Math.ceil(size * delta) * 2)
			SimpleJS.state.player.bomberman = elmentRef
			BoardMap.randomizeBricks()
			grids = BoardMap.initLevel(map)
			SimpleJS.state.initialized = true
			bomb = new Bomb();
			SimpleJS.state.monsters = new Monster().initMonsters(totalMonsters, MapSchema, map);
			SimpleJS.setState()
			requestAnimationFrame(() => animateMovement());
		})
	}

	// if (!SimpleJS.state.initialized) {
	// 	// const playerPos = BoardMap.getPlayerPose()
	// 	// SimpleJS.state.player = new Player(playerPos[0] * width, playerPos[1] * height, Math.ceil(size * delta) * 2)
	// 	// SimpleJS.state.player.bomberman = elmentRef
	// }

	return (
		SimpleJS.createElement("div",{class:"body"},[
		  SimpleJS.createElement("div",{class: "container"},[
			map
		  ]),
	
		  SimpleJS.state.pause && menu()
		])
	  )
	}

/*
<div class="map"></div>
*/