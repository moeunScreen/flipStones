function init(){
    boardInit();
    window.addEventListener("resize",resize);
    canvas.addEventListener("click", handleClick);

    resize();
}

const canvas = document.getElementById("game");
const canvasCtx = canvas.getContext("2d");
let computerThinking = false;

function loop(){
    

        render();

        if(gameState==="GAMEOVER"){
            requestAnimationFrame(loop);
            return;
        }

        if (turn === "computer" && !computerThinking) {
            computerThinking = true;
            setTimeout(() => {
            if (gameState !== "GAMEOVER") {  
                computerTurn();
            }
            computerThinking = false;
            }, 1000);
    }

        requestAnimationFrame(loop);

    }

init();
loop();