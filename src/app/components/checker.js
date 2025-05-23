import { SimpleJS } from "../../dist/index.js";
import { bomb, height, size, width } from "../App.js";
import { ws } from "../index.js";

const checkIfinBomb = (grids, player, rounding) => {
	return grids[rounding(player.y / height)][rounding(player.x / width)].type.includes("bomb-wall");;
};

const handlePowerUp = (grids, bomb, player, delta) => {
	const row = Math.round(player.y / height);
	const col = Math.round(player.x / width);
	if (grids[row][col].power.startsWith("powered")) {
		if (grids[row][col].power.endsWith("idel")) {
			bomb.bombs++;
		} else if (grids[row][col].power.endsWith("fire")) {
			bomb.expCount++
		} else {
			if ((size / delta * 0.9) > SimpleJS.state.players[SimpleJS.state.playerName].pObj.speed * 1.1) {
				SimpleJS.state.players[SimpleJS.state.playerName].pObj.speed *= 1.1
			} else if (SimpleJS.state.players[SimpleJS.state.playerName].pObj.speed != size / delta * 0.9) {
				SimpleJS.state.players[SimpleJS.state.playerName].pObj.speed = size / delta * 0.9
			}
		}
		ws.send(JSON.stringify({ type: "powerups", playerName: SimpleJS.state.playerName, row, col }))
		grids[row][col].power = "";
		SimpleJS.setState((prev) => ({
			...prev,
			powers: prev.powers.filter((p) => p.id !== grids[row][col].id),
		}));
	}
};

export const checkUpperMove = (grids, rowBot, colBot, colTop, object, delta) => {
	const leftGrid =
		grids[rowBot][colBot].type.includes(" wall ") ||
		grids[rowBot][colBot].type.includes("soft-wall") ||
		(grids[rowBot][colBot].type.includes("bomb-wall") && !checkIfinBomb(grids, object, Math.floor));
	const rightGrid =
		grids[rowBot][colTop].type.includes(" wall ") ||
		grids[rowBot][colTop].type.includes("soft-wall") ||
		(grids[rowBot][colTop].type.includes("bomb-wall") && !checkIfinBomb(grids, object, Math.floor));
	if (leftGrid && !rightGrid) {
		if (Math.ceil((object.x + (object.speed * delta)) / width) > Math.ceil(object.x / width)) {
			return [true, (object.x = Math.ceil(object.x / width) * size)];
		} else {
			return [true, (object.x += object.speed * delta)];
		}
	}
	if (!leftGrid && rightGrid) {
		if (Math.floor((object.x - object.speed * delta) / width) < Math.floor((object.x) / width)) {
			return [true, object.x = (Math.floor((object.x) / width)) * size];
		} else {
			return [true, (object.x -= object.speed * delta)];
		}
	}
	if (leftGrid && rightGrid) {
		object.y = Math.floor(object.y / height) * size
		return [true, object.x];
	}

	handlePowerUp(grids, bomb, object, delta);

	return [false, object.x];
};

export const checkDownMove = (grids, rowTop, colBot, colTop, object, delta) => {
	const leftGrid =
		grids[rowTop][colBot].type.includes(" wall ") ||
		grids[rowTop][colBot].type.includes("soft-wall") ||
		(grids[rowTop][colBot].type.includes("bomb-wall") && !checkIfinBomb(grids, object, Math.ceil));
	const rightGrid =
		grids[rowTop][colTop].type.includes(" wall ") ||
		grids[rowTop][colTop].type.includes("soft-wall") ||
		(grids[rowTop][colTop].type.includes("bomb-wall") && !checkIfinBomb(grids, object, Math.ceil));

	if (leftGrid && !rightGrid) {
		if (Math.ceil((object.x + object.speed * delta) / width) > Math.ceil(object.x / width)) {
			return [true, (object.x = Math.ceil(object.x / width) * size)];
		} else {
			return [true, (object.x += object.speed * delta)];
		}
	}

	if (!leftGrid && rightGrid) {
		if (Math.floor((object.x - object.speed * delta) / width) < Math.floor(object.x / width)) {
			return [true, (object.x = Math.floor(object.x / width) * size)];
		} else {
			return [true, (object.x -= object.speed * delta)];
		}
	}

	if (leftGrid && rightGrid) {
		object.y = Math.ceil(object.y / height) * size
		return [true, object.x];
	}


	handlePowerUp(grids, bomb, object, delta);

	return [false, object.x];
};

export const checkLeftMove = (grids, rowBot, rowTop, colBot, object, delta) => {
	const downGrid =
		grids[rowTop][colBot].type.includes(" wall ") ||
		grids[rowTop][colBot].type.includes("soft-wall") ||
		(grids[rowTop][colBot].type.includes("bomb-wall") && !checkIfinBomb(grids, object, Math.floor));
	const upGrid =
		grids[rowBot][colBot].type.includes(" wall ") ||
		grids[rowBot][colBot].type.includes("soft-wall") ||
		(grids[rowBot][colBot].type.includes("bomb-wall") && !checkIfinBomb(grids, object, Math.floor));

	if (upGrid && !downGrid) {
		if (Math.ceil((object.y + object.speed * delta) / height) > Math.ceil(object.y / height)) {
			return [true, (object.y = Math.ceil(object.y / height) * size)];
		} else {
			return [true, (object.y += object.speed * delta)];
		}
	}
	if (!upGrid && downGrid) {
		if (Math.floor((object.y - object.speed * delta) / height) < Math.floor(object.y / height)) {
			return [true, (object.y = Math.floor(object.y / height) * size)];
		} else {
			return [true, (object.y -= object.speed * delta)];
		}
	}
	if (upGrid && downGrid) {
		object.x = Math.floor(object.x / width) * size
		return [true, object.y];
	}

	handlePowerUp(grids, bomb, object, delta);

	return [false, object.y];
};

export const checkRightMove = (grids, rowBot, rowTop, colTop, object, delta) => {
	const upGrid =
		grids[rowBot][colTop].type.includes(" wall ") ||
		grids[rowBot][colTop].type.includes("soft-wall") ||
		(grids[rowBot][colTop].type.includes("bomb-wall") && !checkIfinBomb(grids, object, Math.ceil));
	const downGrid =
		grids[rowTop][colTop].type.includes(" wall ") ||
		grids[rowTop][colTop].type.includes("soft-wall") ||
		(grids[rowTop][colTop].type.includes("bomb-wall") && !checkIfinBomb(grids, object, Math.ceil));


	if (upGrid && !downGrid) {
		if (Math.ceil((object.y + object.speed * delta) / height) > Math.ceil(object.y / height)) {
			return [true, (object.y = Math.ceil(object.y / height) * size)];
		} else {
			return [true, (object.y += object.speed * delta)];
		}
	}
	if (!upGrid && downGrid) {
		if (Math.floor((object.y - object.speed * delta) / height) < Math.floor(object.y / height)) {
			return [true, (object.y = Math.floor(object.y / height) * size)];
		} else {
			return [true, (object.y -= object.speed * delta)];
		}
	}
	if (upGrid && downGrid) {
		object.x = Math.ceil(object.x / width) * size
		return [true, object.y];
	}
	handlePowerUp(grids, bomb, object, delta);


	return [false, object.y];
};

export const getPosImg = (frameX, frameY, div) => {
	const x = frameX * width;
	const y = frameY * height;
	div.style.backgroundPosition = `${x}px ${y}px`;
};

export const checkIfBombed = (grids, x, y) => {
	return grids[Math.round(y / height)][Math.round(x / width)].type.includes("explosion");
};