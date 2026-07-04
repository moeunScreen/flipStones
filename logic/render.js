let FONT = "16px Noto Sans";
let BIGFONT = "32px Noto Sans";

function render(){
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    if(gameState==="GAMEOVER"){
        drawBoard();
        drawStone(board);
        drawWinner();
        return;
    }
    else if(gameState==="SETUP"){
        drawSelect();
        return;
    }
    drawBoard();
    drawStone(board);
}
function resize(){
    const size = Math.min(window.innerWidth,window.innerHeight);

    canvas.width = size;
    canvas.height = size;

    SPACESIZE = canvas.width / BOARDWIDTH;

    render();
}
function drawSelect(){
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard();
    drawStone(board);

   if (gameState === "SETUP"){

        // 반투명 어두운 배경 (중앙 강조)
        canvasCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        // 중앙 박스
        const boxW = 300;
        const boxH = 180;
        const x = (canvas.width - boxW) / 2;
        const y = (canvas.height - boxH) / 2;

        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(x, y, boxW, boxH);

        canvasCtx.strokeStyle = "#000";
        canvasCtx.strokeRect(x, y, boxW, boxH);

        // 텍스트
        canvasCtx.fillStyle = "black";
        canvasCtx.textAlign = "center";
        canvasCtx.font = "20px Arial";

        whiteBtn = {
            x: canvas.width / 2 - 100,
            y: y + 80,
            w: 200,
            h: 40
        };

        blackBtn = {
            x: canvas.width / 2 - 100,
            y: y + 120,
            w: 200,
            h: 40
        };

        canvasCtx.fillText("Pick your color", canvas.width / 2, y + 50);

        canvasCtx.fillStyle = "#ddd";
        canvasCtx.fillRect(whiteBtn.x, whiteBtn.y, whiteBtn.w, whiteBtn.h);
        canvasCtx.fillRect(blackBtn.x, blackBtn.y, blackBtn.w, blackBtn.h);

        canvasCtx.fillStyle = "black";
        canvasCtx.fillText("WHITE", canvas.width / 2, whiteBtn.y + 25);
        canvasCtx.fillText("BLACK", canvas.width / 2, blackBtn.y + 25);
        
     }
}

function drawWinner(){
    if (gameState === "GAMEOVER") {
    const score = getScore();
    const totalScore = Math.abs(score.black - score.white);
    const playerScore =
    playerTile === BLACK ? score.black : score.white;
    const computerScore =
    computerTile === BLACK ? score.black : score.white;
    const playerWins = (winner === playerTile);
    const computerWins = (winner === computerTile);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    canvasCtx.fillStyle = "#708090";
    canvasCtx.shadowColor = "rgba(0, 0, 0, 0.4)";
    canvasCtx.shadowBlur = 6;
    canvasCtx.shadowOffsetX = 2;
    canvasCtx.shadowOffsetY = 2;
    canvasCtx.textAlign = "center";
    canvasCtx.font = "30px Arial";



    canvasCtx.fillText(
        playerWins ? "Player Wins!" :
        computerWins ? "Computer Wins!" :
        "Draw!",
        centerX,
        centerY - 80
    );
      canvasCtx.fillText(
        `player : ${playerScore}`,
        centerX, centerY - 40
    );

    canvasCtx.fillText(
        `Computer : ${computerScore}`,
        centerX, centerY,
        345
    );
    canvasCtx.fillText(
        `Score Difference : ${totalScore}`,
        centerX, centerY + 40
    );
}
}

function drawBoard(){
    canvasCtx.fillStyle = "green";
    canvasCtx.fillRect(0, 0, SPACESIZE*BOARDWIDTH, SPACESIZE*BOARDHEIGHT);


    for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
        canvasCtx.strokeRect(x * SPACESIZE, y * SPACESIZE,
             SPACESIZE, SPACESIZE);
    }
    }

}
function drawStone(board){

     for (let y = 0; y < BOARDHEIGHT; y++) {
        for (let x = 0; x < BOARDWIDTH; x++) {

            if (board[y][x] === BLACK) {
                drawBlackStone(y, x);
            }

            if (board[y][x] === WHITE) {
                drawWhiteStone(y, x);
    
            }
        }
    }
}

function drawBlackStone(y,x){

    canvasCtx.beginPath();

    canvasCtx.arc(
        x * SPACESIZE + SPACESIZE / 2,
        y * SPACESIZE + SPACESIZE / 2,
        SPACESIZE * 0.4,
        0,
        Math.PI * 2
    );

        canvasCtx.fillStyle = "black";
        canvasCtx.fill();
}

function drawWhiteStone(y,x){

    canvasCtx.beginPath();

    canvasCtx.arc(
        x * SPACESIZE + SPACESIZE / 2,
        y * SPACESIZE + SPACESIZE / 2,
        SPACESIZE * 0.4,
        0,
        Math.PI * 2
    );

        canvasCtx.fillStyle = "white";
        canvasCtx.fill();
}

