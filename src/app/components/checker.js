import { height, width } from "../App.js";

export const checkUpperMove = (grids, rowBot, colBot, colTop, object) => {
  const leftGrid =
    grids[rowBot][colBot].type.includes("wall") ||
    grids[rowBot][colBot].type.includes("soft-wall") ||
    (grids[rowBot][colBot].type.includes("bomb-wall") && !checkIfinBomb(grids, object));
  const rightGrid =
    grids[rowBot][colTop].type.includes("wall") ||
    grids[rowBot][colTop].type.includes("soft-wall") ||
    (grids[rowBot][colTop].type.includes("bomb-wall") && !checkIfinBomb(grids, object));
  if (leftGrid && !rightGrid) {
    return [true, (object.x += object.speed)];
  }
  if (!leftGrid && rightGrid) {
    return [true, (object.x -= object.speed)];
  }
  if (leftGrid && rightGrid) {
    return [true, object.x];
  }
  return [false, object.x];
};

export const checkDownMove = (grids, rowTop, colBot, colTop, object) => {
  const leftGrid =
    grids[rowTop][colBot].type.includes("wall") ||
    grids[rowTop][colBot].type.includes("soft-wall") ||
    (grids[rowTop][colBot].type.includes("bomb-wall") && !checkIfinBomb(grids, object));
  const rightGrid =
    grids[rowTop][colTop].type.includes("wall") ||
    grids[rowTop][colTop].type.includes("soft-wall") ||
    (grids[rowTop][colTop].type.includes("bomb-wall") && !checkIfinBomb(grids, object));
  if (leftGrid && !rightGrid) {
    return [true, (object.x += object.speed)];
  }
  if (!leftGrid && rightGrid) {
    return [true, (object.x -= object.speed)];
  }
  if (leftGrid && rightGrid) {
    return [true, object.x];
  }
  return [false, object.x];
};

export const checkLeftMove = (grids, rowBot, rowTop, colBot, object) => {
  const downGrid =
    grids[rowTop][colBot].type.includes("wall") ||
    grids[rowTop][colBot].type.includes("soft-wall") ||
    (grids[rowTop][colBot].type.includes("bomb-wall") && !checkIfinBomb(grids, object));
  const upGrid =
    grids[rowBot][colBot].type.includes("wall") ||
    grids[rowBot][colBot].type.includes("soft-wall") ||
    (grids[rowBot][colBot].type.includes("bomb-wall") && !checkIfinBomb(grids, object));
  if (upGrid && !downGrid) {
    return [true, (object.y += object.speed)];
  }
  if (!upGrid && downGrid) {
    return [true, (object.y -= object.speed)];
  }
  if (upGrid && downGrid) {
    return [true, object.y];
  }
  return [false, object.y];
};

export const checkRightMove = (grids, rowBot, rowTop, colTop, object) => {
  const upGrid =
    grids[rowBot][colTop].type.includes("wall") ||
    grids[rowBot][colTop].type.includes("soft-wall") ||
    (grids[rowBot][colTop].type.includes("bomb-wall") && !checkIfinBomb(grids, object));
  const downGrid =
    grids[rowTop][colTop].type.includes("wall") ||
    grids[rowTop][colTop].type.includes("soft-wall") ||
    (grids[rowTop][colTop].type.includes("bomb-wall") && !checkIfinBomb(grids, object));

  if (upGrid && !downGrid) {
    return [true, (object.y += object.speed)];
  }
  if (!upGrid && downGrid) {
    return [true, (object.y -= object.speed)];
  }
  if (upGrid && downGrid) {
    return [true, object.y];
  }
  return [false, object.y];
};

export const getPosImg = (frameX, frameY, div) => {
  const x = frameX * width;
  const y = frameY * height;
  div.style.backgroundPosition = `${x}px ${y}px`;
};

export const checkIfBombed = (grids, x, y) => {
  // console.log("check", grids[Math.round(y / height)][
  //   Math.round(x / width)
  // ].type)
  return grids[Math.round(y / height)][
    Math.round(x / width)
  ].type.includes("explosion");
};

export const checkIfPortal = (grids, x, y) => {
  return grids[Math.round(y / height)][
    Math.round(x / width)
  ].classList.contains("portal");
};

const checkIfinBomb = (grids, player) => {
  return grids[Math.round(player.y / height)][
    Math.round(player.x / width)
  ].classList.contains("bomb-wall");
}