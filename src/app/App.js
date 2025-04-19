import { SimpleJS } from '../dist/index.js'
import { useEffect, useRef, useState } from '../dist/utils.js';
import { animateMovement } from './components/animation.js';
import { Bomb } from './components/bomb.js';
import { Board, MapSchema } from './components/map.js';
import { menu } from './components/menu.js';
import { Monster } from './components/monsters.js';
import { otherPlayer, Player } from './components/player.js';

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

export const Game = () => {

	const map = SimpleJS.createElement('div', {
		class: 'map',
		tabindex: 0,
		autofocus: true,
		style: `width:${MapSchema[0].length * width}px;height:${MapSchema.length * height}px`,
		onkeydown: (e) => SimpleJS.state.players[SimpleJS.state.playerName].pObj?.movePlayer(e, map),
		onkeyup: (e) => SimpleJS.state.players[SimpleJS.state.playerName].pObj?.stopPlayer(e, map)
	}, [


		...Object.keys(SimpleJS.state.players).map((playerName) => {
			console.log("tttttttttttttttt")
			if (SimpleJS.state.players[playerName].pObj) {
				const elmentRef = useRef(playerName)
				SimpleJS.state.players[playerName].pObj.bomberman = elmentRef
				const { pObj } = SimpleJS.state.players[playerName]

				return SimpleJS.createElement('div', {
					class: 'bomber-man',
					style: `background-image:url(assets/4.png);
						background-size:${4 * width}px ${4 * height}px;
						width:${width}px;
						height:${height}px;
						transform:translate(${pObj.x}px, ${pObj.y}px);
						`,
					ref: elmentRef,
				})

			}
			return ""
		}
		)


		,

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
			/* all players */
			Object.entries(SimpleJS.state.players).forEach(([playerName, data]) => {
				SimpleJS.state.players[playerName].pObj = new Player(data.spawn[0] * width, data.spawn[1] * height, Math.ceil(size * delta) * 2)
			});
			BoardMap.randomizeBricks(SimpleJS.state.diffMap)
			grids = BoardMap.initLevel(map)
			bomb = new Bomb();
			// SimpleJS.state.monsters = new Monster().initMonsters(totalMonsters, MapSchema, map);

			SimpleJS.setState()
			console.log("%v => ",SimpleJS.state.players[SimpleJS.state.playerName])
			requestAnimationFrame(() => animateMovement());
		})
	}

	return (
		SimpleJS.createElement("div", { class: "body" }, [
			SimpleJS.createElement("div", { class: "container" }, [
				map
			])
		])
	)
}

/*
<div class="map"></div>
*/