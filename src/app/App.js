import { SimpleJS } from '../dist/index.js'
import { useEffect, useRef } from '../dist/utils.js';
import { Chat } from './chat.js';
import { animateMovement, bomChecker } from './components/animation.js';
import { Bomb } from './components/bomb.js';
import { Board, MapSchema } from './components/map.js';
import { Player } from './components/player.js';
import { playerInfo } from './components/playerInfo.js';
import { Forbidden } from './forbidden.js';

let initWidth = Math.floor(window.innerWidth / MapSchema[0].length / 1.8)
let initHeight = Math.floor(window.innerHeight / MapSchema.length / 1.8)

export let size = Math.min(initWidth, initHeight);
export let width = size;
export let height = size;
// export let delta = 0.0166
export let grids = []
export let bomb

export let startBombCheck = {current :false}
export let intervalID
document.addEventListener("visibilitychange", () => {
	if (document.hidden && startBombCheck.current) {
		intervalID = setInterval(() => {
			bomChecker()
		}, 16.7)
	} else {
		clearInterval(intervalID)
	}
})

window.addEventListener("resize", function () {
	const oldSize = size;
	initWidth = Math.floor(window.innerWidth / MapSchema[0].length / 1.8);
	initHeight = Math.floor(window.innerHeight / MapSchema.length / 1.8);
	size = Math.min(initWidth, initHeight);
	width = size;
	height = size;
	SimpleJS.setState(prev => {
		const scaleFactor = size / oldSize;
		const updatedPlayers = Object.fromEntries(
			Object.entries(prev.players).map(([key, obj]) => {
				obj.pObj.x *= scaleFactor;
				obj.pObj.y *= scaleFactor;
				obj.pObj.startX *= scaleFactor;
				obj.pObj.startY *= scaleFactor;
				obj.pObj.speed *= scaleFactor;
				if (obj.pObj.bomberman.current) {
					obj.pObj.bomberman.current.style.transform = `translate(${obj.pObj.x}px, ${obj.pObj.y}px)`;
				}
				return [key, obj];
			})
		);

		return {
			...prev,
			players: updatedPlayers,
		};
	});
});

export const Game = () => {
	if (SimpleJS.state.currentPage !== "/game") {
		return Forbidden()
	}

	const map = SimpleJS.createElement('div', {
		class: 'map',
		tabindex: 0,
		autofocus: true,
		style: `width:${MapSchema[0].length * width}px;height:${MapSchema.length * height}px`,
		onkeydown: SimpleJS.state.players[SimpleJS.state.playerName]?.pObj ? (e) => SimpleJS.state.players[SimpleJS.state.playerName].pObj?.movePlayer(e, map) : "",
		onkeyup: SimpleJS.state.players[SimpleJS.state.playerName]?.pObj ? (e) => SimpleJS.state.players[SimpleJS.state.playerName].pObj?.stopPlayer(e, map) : ""
	}, [


		...Object.keys(SimpleJS.state.players).map((playerName, index) => {
			if (SimpleJS.state.players[playerName].pObj) {
				const elmentRef = useRef(playerName)
				SimpleJS.state.players[playerName].pObj.bomberman = elmentRef
				const { pObj } = SimpleJS.state.players[playerName]

				return SimpleJS.createElement('div', {
					class: 'bomber-man',
					style: `background-image:url(assets/${index + 1}.png);
						background-size:${4 * width}px ${4 * height}px;
						background-position:${1 * width}px 0px;
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
		),

		// Render power-ups
		...SimpleJS.state.powers.map(power =>
			SimpleJS.createElement('div', {
				class: 'bomb',
				style: `
                background-image:url(assets/${power.image}.png);
                background-size:${width}px ${height}px;
                width:${width}px;
                height:${height}px;
                background-position:${width}px ${height * 2}px;
                position:absolute;
                transform:translate(${power.xPos * width}px, ${power.yPos * height}px);
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

	])

	const BoardMap = new Board(map, MapSchema)
	if (SimpleJS.state.grids.length == 0) {
		useEffect(() => {
			/* all players */
			Object.entries(SimpleJS.state.players).forEach(([playerName, data]) => {
				SimpleJS.state.players[playerName].pObj = new Player(data.spawn[0] * width, data.spawn[1] * height, size * 2)
			});
			BoardMap.randomizeBricks(SimpleJS.state.diffMap)
			grids = BoardMap.initLevel(map)
			bomb = new Bomb();
			SimpleJS.setState()

			requestAnimationFrame(animateMovement);
			startBombCheck.current = true
		})
	}

	return (
		SimpleJS.createElement("div", { class: "body q container-body" }, [
			Chat(),
			SimpleJS.createElement("div", { class: "game" }, [
				SimpleJS.createElement("div", { class: "playerInfo topNav" }, [
					playerInfo(0, 1, true),  // Player 1: Top-left
					playerInfo(2, 3, false)  // Player 3: Top-right
					]),
				SimpleJS.createElement("div", { class: "container" }, [
					map
				]),
				SimpleJS.createElement("div", { class: "playerInfo botNav" }, [
					playerInfo(3, 4, true),  // Player 4: Bottom-left
					playerInfo(1, 2, false)  // Player 2: Bottom-right
				]),
			]),

		])
	)
}














