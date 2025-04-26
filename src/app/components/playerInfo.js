import { SimpleJS } from "../../dist/index.js";

export const playerInfo = (playerIndex, isLeft) => {
    const playerName = SimpleJS.state.playerNames[playerIndex];
    const player = SimpleJS.state.players[playerName];
    const imageUrl = `assets/${playerIndex+1}.png`;

    if (playerName && player ) {

      const details = SimpleJS.createElement("div", { class: "player-details" }, [
        SimpleJS.createElement("h1", {style:`text-decoration:${player.pObj ? "none":"line-through"}`}, [`${playerName}`]),
        SimpleJS.createElement("h1", {}, [player.pObj ? `${player.pObj.lifes}x` : "dead"])
      ]);

      return SimpleJS.createElement("div", { class: "player-info", style: `justify-content:${isLeft ? 'flex-start' : 'flex-end'}` }, [
        isLeft ? SimpleJS.createElement("div", { class:"player-image", style: `background-image: url(${imageUrl})` }) : "",
        details,
        !isLeft ? SimpleJS.createElement("div", { class:"player-image",style: `background-image: url(${imageUrl})` }) : ""
      ]);
    } else {
      return SimpleJS.createElement("div", { class: "player-info" ,style: `justify-content:center`}, [
        SimpleJS.createElement("div", { class: "player-details" }, [
            SimpleJS.createElement("h1", {}, [`Unknown`]),
            
        ])
      ]);
    }
  };