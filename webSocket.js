const Room ={
    
    id:null,
    players:[],
    messages:[],
}

export function CreatePlayer(playerName) {
    if (!Room.id) {
        Room.id = 1 
    }else {
        Room.id++
    }
    Room.players.push(playerName); 
    let start_game = false;
    if (Room.players.length >= 2 && Room.players.length <= 4){
        start_game = true
    }else  {
        start_game = false
    }
    return  [playerName,start_game,Room.players]
    
}