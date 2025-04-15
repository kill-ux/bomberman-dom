import { height, width } from "../App.js";

export const checkUpperMove = (grids, rowBot, colBot, colTop, object) => {
  console.log(grids)
  const leftGrid =
    grids[rowBot][colBot].classList.contains("wall") ||
    grids[rowBot][colBot].classList.contains("soft-wall") ||
    (grids[rowBot][colBot].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  const rightGrid =
    grids[rowBot][colTop].classList.contains("wall") ||
    grids[rowBot][colTop].classList.contains("soft-wall") ||
    (grids[rowBot][colTop].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
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
  // console.log(grids,rowTop, colBot, colTop)
  const leftGrid =
    grids[rowTop][colBot].classList.contains("wall") ||
    grids[rowTop][colBot].classList.contains("soft-wall") ||
    (grids[rowTop][colBot].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  const rightGrid =
    grids[rowTop][colTop].classList.contains("wall") ||
    grids[rowTop][colTop].classList.contains("soft-wall") ||
    (grids[rowTop][colTop].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
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
    grids[rowTop][colBot].classList.contains("wall") ||
    grids[rowTop][colBot].classList.contains("soft-wall") ||
    (grids[rowTop][colBot].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  const upGrid =
    grids[rowBot][colBot].classList.contains("wall") ||
    grids[rowBot][colBot].classList.contains("soft-wall") ||
    (grids[rowBot][colBot].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
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
    grids[rowBot][colTop].classList.contains("wall") ||
    grids[rowBot][colTop].classList.contains("soft-wall") ||
    (grids[rowBot][colTop].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  const downGrid =
    grids[rowTop][colTop].classList.contains("wall") ||
    grids[rowTop][colTop].classList.contains("soft-wall") ||
    (grids[rowTop][colTop].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));

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
  console.log("inside get post image",x,y)
};