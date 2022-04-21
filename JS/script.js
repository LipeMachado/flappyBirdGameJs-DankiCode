let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// Carregando imagens
let bird = new Image();
bird.src = "../images/bird.png"

let background = new Image();
background.src = "../images/bg.png"

let floor = new Image();
floor.src = "../images/chao.png"

let upperPipe = new Image();
upperPipe.src = "../images/canocima.png"

let lowerPipe = new Image();
lowerPipe.src = "../images/canobaixo.png"

//Carregando Sons
let flySound = new Audio();
flySound.src = "../sounds/fly.mp3"
let scoreSound = new Audio();
scoreSound.src = "../sounds/score.mp3"

// Variáveis
let spaceBetweenPipes = 100;
let constant;
let birdX = 33;
let birdY = 200;
let gravity = 1.4;
let score = 0;
let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
} 

// Captura de tecla

document.addEventListener("keyup", event => {
    if (event.code === 'Space') {
        fly()
    }
});

// Flying

function fly() {
    birdY = birdY - 50
    flySound.play();
}

function movingPipes() {
    for (let i = 0; i < pipe.length; i++) {
        //Movimentação do pipe
        pipe[i].x = pipe[i].x - 1
        if (pipe[i].x == 80) {
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random()*upperPipe.height) - upperPipe.height
            })
        }
    }
}

function renderPipes() {
    //Criando os Pipes
    for (let i = 0; i < pipe.length; i++) {
        //Posição do pipe lower
        constant = upperPipe.height + spaceBetweenPipes;
        
        //Configurando upper pipe
        context.drawImage(upperPipe, pipe[i].x, pipe[i].y)
        
        //Configurando lower pipe
        context.drawImage(lowerPipe, pipe[i].x, pipe[i].y + constant)

        if (birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + upperPipe.width) {
            // Bird colidiu com o cano de cime ou cano debaixo
            if (birdY <= pipe[i].y + upperPipe.height || birdY + bird.height >= pipe[i].y + constant) {
                location.reload()
            }
        }

        //Score
        if (pipe[i].x == 5) {
            score = score + 1;
            scoreSound.play()
        }
        
    }
}

function floorColision() {

    // Bird colidiu com o chão
    if (Math.floor(birdY) == canvas.height - floor.height) {
        location.reload()
    }
}

function game() {
    // Background
    context.drawImage(background, 0, 0)

    renderPipes()
    
    movingPipes()

    floorColision()

    // Desenhando o floor
    context.drawImage(floor, 0, canvas.height - floor.height)

    // Bird
    context.drawImage(bird, birdX, birdY)
    birdY += gravity

    // Criando score
    let scoreId = document.getElementById("score")
    scoreId.innerHTML = score

    requestAnimationFrame(game);
}

game()