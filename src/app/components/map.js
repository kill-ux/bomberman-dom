//import { SimpleJS } from '../../dist/index.js'
import { SimpleJS } from "../../dist/index.js";
import { useRef } from "../../dist/utils.js";
import { width, height } from "../App.js";

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
		this.bluePrint = bluePrint
	}

	//Solo + Co-Op mode randomize add a port§
	randomize_CoOp_Bricks() {
		let portal = false
		for (
			let i = 0;
			i < (this.bluePrint.length * this.bluePrint[0].length) / 2;
			i++
		) {
			const row = Math.floor(Math.random() * this.bluePrint.length)
			const col = Math.floor(Math.random() * this.bluePrint[0].length)

			if (!portal && this.bluePrint[row][col] == 0) {
				this.bluePrint[row][col] = 3
				portal = true
				continue
			}
			if (this.bluePrint[row][col] == 0) this.bluePrint[row][col] = 2
		}
	}

	randomizeBricks() {
		for (
			let i = 0;
			i < (this.bluePrint.length * this.bluePrint[0].length) / 2;
			i++
		) {
			const row = Math.floor(Math.random() * this.bluePrint.length)
			const col = Math.floor(Math.random() * this.bluePrint[0].length)

			if (this.bluePrint[row][col] == 0) this.bluePrint[row][col] = 2
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
		this.map.attrs.style = `width:${this.bluePrint[0].length * width}px;height:${this.bluePrint.length * height}px`

		const grids = []
		for (let i = 0; i < this.bluePrint.length; i++) {
			grids[i] = []
			for (let j = 0; j < this.bluePrint[i].length; j++) {
				const divRef = useRef(`grid${j}-${i}`)
				const div = SimpleJS.createElement('div', {
					style: `image-rendering:pixelated; width:${width}px;height:${height}px;`,
					ref: divRef
				})
				//div.attrs.style = 'imageRendering:pixelated;'
				// grids[i].push(div)
				grids[i].push(divRef.current)
				// this.map.appendChild(div)
				this.map.children.push(div)


				if (this.bluePrint[i][j] == 0 || this.bluePrint[i][j] == 'x') {
					//   div.classList.add('empty')
					div.attrs.class = 'empty'
					continue
				}
				if (this.bluePrint[i][j] == 1) {
					//   div.classList.add('wall')
					div.attrs.class = 'wall'

					continue
				}
				if (this.bluePrint[i][j] == 2) {
					//   div.classList.add('soft-wall')
					div.attrs.class = 'soft-wall'

					continue
				}
				if (this.bluePrint[i][j] == 3) {
					//   div.classList.add('soft-wall', 'portal')
					div.attrs.class = 'soft-wall portal'
					continue
				}
			}
		}
		return grids
	}
}