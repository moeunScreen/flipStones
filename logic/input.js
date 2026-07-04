function handleClick(event){

     if(turn !== 'player'){
        return;
    }

    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (gameState === "SETUP"){

        if (
        mouseX >= whiteBtn.x &&
        mouseX <= whiteBtn.x + whiteBtn.w &&
        mouseY >= whiteBtn.y &&
        mouseY <= whiteBtn.y + whiteBtn.h
    ){
        selectColor(WHITE);
    }
     if (
        mouseX >= blackBtn.x &&
        mouseX <= blackBtn.x + blackBtn.w &&
        mouseY >= blackBtn.y &&
        mouseY <= blackBtn.y + blackBtn.h
    ){
        selectColor(BLACK);
    }
    }   
    
    const move = getSpaceClicked(mouseX,mouseY);
    makeMove(move.x,move.y);
    checkTurn();
    const tile = (turn === "player") ? playerTile : computerTile;
    validMoves = getValidMove(board,tile);
}

function selectColor(color){
    playerTile = color;

    if (color === BLACK){
        computerTile = WHITE;
    } else {
        computerTile = BLACK;
    }

    gameState = "PLAYING";
}