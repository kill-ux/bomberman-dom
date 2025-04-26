//import { SimpleJS } from '../../dist/index.js'
import { SimpleJS } from "../../dist/index.js";

export const MapSchema = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 'x', 'x', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'x', 'x', 1],
	[1, 'x', 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 'x', 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 'x', 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 'x', 1],
	[1, 'x', 'x', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'x', 'x', 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]


export class Board {
	constructor(map, bluePrint) {
		this.map = map
		this.bluePrint = bluePrint.map(grid => grid.map(e => e))
		this.maxNothing = 15
		this.ran = [2, 3, 4, 5, 3, 4, 5]
	}

	randomizeBricks(arr) {
		let powers = 4;
		for (
			let i = 0;
			i < Math.floor((this.bluePrint.length * this.bluePrint[0].length) / 2);
			i++
		) {
			const row = Math.floor(arr[i][0] * this.bluePrint.length)
			const col = Math.floor(arr[i][1] * this.bluePrint[0].length)

			if (this.bluePrint[row][col] == 0) {
				this.bluePrint[row][col] = this.ran[i % this.ran.length]
			}
		}

	}
	getPlayerPose = () => {
		for (let i = 0; i < this.bluePrint.length; i++) {
			for (let j = 0; j < this.bluePrint[i].length; j++) {
				if (this.bluePrint[i][j] === "x") return [i, j];
			}
		}
	}

	initLevel() {
		const gridState = this.bluePrint.map((row, i) => row.map((cell, j) => {
			return {
				type: (cell === 0 || cell === 'x')
					? 'empty'
					: (cell === 1 ? ' wall ' : 'soft-wall'),
				power: cell === 3 ? "idel" : (cell === 4 ? "fire" : (cell === 5 ? "battery" : "")),
				id: `${i}-${j}`
			}
		}));
		SimpleJS.state.grids = gridState
	}
}