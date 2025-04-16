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
    const start_game = false;
    if (Room.players.length <= 2 && Room.players.length >= 4){
        start_game = true
    }else if (start_game) {
        start_game = false
    }
    
    return  [playerName,Room.players, start_game]
    
}