function boardInit(){
    board = []
    for(let y=0;y<BOARDHEIGHT;y++){
        board[y] = [];
        
        for(let x=0;x<BOARDWIDTH;x++){
            board[y][x] = EMPTY;
        }
    }
    board[3][3] = WHITE;
    board[4][4] = WHITE;
    board[4][3] = BLACK;
    board[3][4] = BLACK;
}

function endGame(){
    gameState = "GAMEOVER";
    const score = getScore();

      if (score.black > score.white) {
        winner = BLACK;
        }
        else if (score.white > score.black) {
            winner = WHITE;
        }
        else {
            winner = "DRAW";
        }
}

function checkTurn(){
    const currentTile = (turn === "player") ? playerTile : computerTile;

    const currentMoves = getValidMove(board, currentTile);

    if (currentMoves.length > 0) {
        return; // 현재 플레이어가 둘 수 있음
    }

    // 패스
    turn = (turn === "player") ? "computer" : "player";

    const otherTile = (turn === "player") ? computerTile : playerTile;
    const otherMoves = getValidMove(board, otherTile);
    if (otherMoves.length === 0) {
        endGame();
    }
}

function makeMove(x,y){
  
    const tile = (turn === "player") ? playerTile : computerTile;
    const tilesToFlip = isValidMove(board, tile, x, y);
        if (tilesToFlip === false) {
            return;
        }

    board[y][x] = tile;

    for (const pos of tilesToFlip) {
        board[pos.y][pos.x] = tile;
    }

    turn = (turn==="player") ? "computer" : "player"
}

function isOnBoard(y,x){
    return (
        x >= 0 &&
        x < BOARDWIDTH &&
        y >= 0 &&
        y < BOARDHEIGHT
    );
}

function getValidMove(board, tile){
    validMoves = []


    for(x=0;x<BOARDWIDTH;x++){
        for(y=0;y<BOARDHEIGHT;y++){
            
            const tilesToFlip = isValidMove(board,tile,x,y);
            if(tilesToFlip!==false){
                validMoves.push({y,x});
            }
        }
    }
    return validMoves;
}

function isValidMove(board,tile,xstart,ystart){
   if (!isOnBoard(ystart,xstart)) {
        return false;
    }

    if (board[ystart][xstart] !== EMPTY) {
        return false;
    }

    const otherTile = (tile === BLACK) ? WHITE : BLACK;
    const tilesToFlip = [];

    for (const [xdirection, ydirection] of [
    [0,1],[1,1],[1,0],[1,-1],
    [0,-1],[-1,-1],[-1,0],[-1,1] ]) {

        let x = xstart + xdirection;
        let y = ystart + ydirection;
        let line = [];
        if (!isOnBoard(y,x) || board[y][x] !== otherTile){
                continue;
            }    
        while (true){
            x+= xdirection;
            y+= ydirection;
            if (!isOnBoard(y,x)){
                break;
            }
            if (board[y][x]===EMPTY){
                break;
            }
            if (board[y][x] === otherTile){
                continue;
            }
            if(board[y][x]===tile){
                while (true) {
                    x -= xdirection;
                    y -= ydirection;
                    if (x===xstart && y===ystart){
                        break;
                    }
                    tilesToFlip.push({y,x});
                }
                break;
            }
            else{
                break;
            }
        }
    }
    if (tilesToFlip.length === 0){
                return false;
            }

    return tilesToFlip;
}

function computerTurn(){

    const moves = getValidMove(board, computerTile);
    if (moves.length === 0) {
            turn = 'player';
            checkTurn();
            return;
     }

     //그냥 랜덤 (일단 기본 AI)
    const move = moves[Math.floor(Math.random() * moves.length)];

    makeMove(move.x, move.y, true); 

    checkTurn();

}

function getSpaceClicked(mouseX,mouseY){
    const x = Math.floor(mouseX / SPACESIZE);
    const y = Math.floor(mouseY / SPACESIZE);

        if (
            x >= 0 && x < BOARDWIDTH &&
            y >= 0 && y < BOARDHEIGHT
        ) {
            return { x, y };
        }

        return null;

}

function getScore(){
    let black = 0;
    let white = 0;

    for (let y = 0; y < BOARDHEIGHT; y++) {
        for (let x = 0; x < BOARDWIDTH; x++) {
            if (board[y][x] === BLACK) black++;
            else if (board[y][x] === WHITE) white++;
        }
    }

    return { black, white };

}