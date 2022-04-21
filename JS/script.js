let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// Carregando imagens
let bird = new Image();
bird.src = "../images/bird.png"

let background = new Image();
background.src = "../images/background.png"

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

function game() {
    requestAnimationFrame(game);
}