class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let points = new Set();

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let isClicked = false;
let isDrawLine = false;

canvas.width = 0.6*window.innerWidth;
canvas.height = 0.6*window.innerHeight;

window.addEventListener("resize", resizeAction);

canvas.addEventListener("click", clickAction);
document.addEventListener("keydown", keyDownAction);

var connectDotsButton = document.getElementById("connectDotsButton");
var removeLinesButton = document.getElementById("removeLinesButton");
var cleanAreaButton = document.getElementById("cleanAreaButton");

connectDotsButton.addEventListener("click", connectDotsAction);
removeLinesButton.addEventListener("click", removeLinesAction);
cleanAreaButton.addEventListener("click", cleanAreaAction);

const pointWidth = 10;
const pointHeight = 10;

function resizeAction(){
    canvas.width = 0.6*window.innerWidth;
    canvas.height = 0.6*window.innerHeight;
}


function clickAction(e) {
    let posX = e.clientX - canvas.offsetLeft;
    let posY = e.clientY - canvas.offsetTop;
    console.log('[x,y]=[' + posX + ',' + posY + ']');
    points.add(new point(posX, posY));
    isClicked = true;
}

function drawLine() {
    if (isDrawLine) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.beginPath();

        p = points.delete();
        ctx.moveTo(p.x, p.y);

        for (const p of points) {
            ctx.lineTo(p.x - pointWidth/2, p.y - pointHeight/2)
        }

        ctx.stroke();
    }
}

function connectDotsAction(){
    isDrawLine = true;
}

function removeLinesAction(){
    isDrawLine = false;
}

function cleanAreaAction(){
    isDrawLine = false;
    points.clear();
}

function keyDownAction(e) {
    if (e.code == 'KeyD') {
        console.log(e.code);
        connectDotsAction();
    }
    if (e.code == 'KeyS') {
        console.log(e.code);
        removeLinesAction();
    }
    if (e.code == 'KeyC') {
        isDrawLine = false;
        cleanAreaAction();
    }
}

function drawBcg() {
    ctx.fillStyle = '#223522';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPoint() {
    if (isClicked) {
        for (const p of points) {
            ctx.fillStyle = 'black';
            ctx.fillRect(p.x - pointWidth, p.y - pointHeight, pointWidth, pointHeight);
        }
    }
}

function draw() {
    drawBcg();
    drawPoint();
    drawLine();
}

setInterval(draw, 1000 / 60);
