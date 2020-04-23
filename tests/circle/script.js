const CIRCLE_RADIUS = 10;

var posMouseX = 0;
var posMouseY = 0;

class Circle {
    constructor(inPosX, inPosY, inAlpha) {
        this.posX = inPosX;
        this.posY = inPosY;
        this.alpha = inAlpha;
    }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var circleArray = []
for (i = CIRCLE_RADIUS; i < canvas.width; i = i + CIRCLE_RADIUS * 2) {
    for (j = CIRCLE_RADIUS; j < canvas.height; j = j + CIRCLE_RADIUS * 2)
    {
        circleArray.push(new Circle(i, j, 0.5));
    }
}

function drawCircle(circle)
{
    ctx.beginPath();
    ctx.arc(circle.posX, circle.posY, CIRCLE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${circle.alpha})`;
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(i = 0; i < circleArray.length; i++)
    {
        var a = circleArray[i].posX - posMouseX;
        var b = circleArray[i].posY - posMouseY;

        var distance = Math.sqrt( a*a + b*b );

        circleArray[i].alpha = 30 / distance;
        drawCircle(circleArray[i]);
    }
}

setInterval(draw, 1000/60);

function onMouseMove(e) {
    var x = e.clientX;
    var y = e.clientY;

    posMouseX = x;
    posMouseY = y;
}

function onTouchMove(event) {
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY;

    posMouseX = x;
    posMouseY = y;
}


