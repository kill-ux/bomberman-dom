
export const death = (player, bomberman) => {
    bomberman.classList.add('immune')
    player.immune = true

    setTimeout(() => {
        player.immune = false
        bomberman.classList.remove('immune')
        player.deathCounter = 0
    }, 2000)
    player.x = player.startX;
    player.y = player.startY;

};