var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var background = new Image();
var foreground = new Image();
var pipeDown = new Image();
var pipeUp = new Image();
var woosh = new Audio();
var tading = new Audio();

bird.src = "images/bird.png";
background.src = "images/background.png";
foreground.src = "images/foreground.png";
pipeDown.src = "images/pipe_down.png";
pipeUp.src = "images/pipe_up.png";
woosh.src = "sounds/woosh.mp3";
tading.src = "sounds/tading.mp3";

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// on key down

document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 25;
    woosh.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

// draw images

function draw() {
    ctx.drawImage(background, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        constant = pipeDown.height + gap;
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeDown.height) - pipeDown.height
            });
        }

        // detect collision

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeDown.width && (bY <= pipe[i].y + pipeDown.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - foreground.height) {
            location.reload(); // reload the page
        }

        if (pipe[i].x == 5) {
            score++;
            tading.play();
        }

    }

    ctx.drawImage(foreground, 0, cvs.height - foreground.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

draw();