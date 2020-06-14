var screenWidth = window.innerWidth;
var screenHeight =  window.innerHeight;
var borderThickness = 20;
var imageScale = 1;
var ballRadius = 30;
var objectRestitution = 1;
var gravityScale = 0.002;

var colorArray = [];
colorArray.push('rgb(47,175,74)');
colorArray.push('rgb(255,123,255)');

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;
     
var engine = Engine.create();
 
var render = Render.create({
                element: document.body,
                engine: engine,
                options: {
                    width: screenWidth,
                    height: screenHeight,
                    background: 'rgb(255,255,255)',
                    wireframes: false
                }
             });

var bodyMouse = Mouse.create(document.body);
var options = {
  mouse: bodyMouse
};
mConstraint = MouseConstraint.create(engine, options);
World.add(engine.world, mConstraint);

Events.on(mConstraint, "mousedown", function(event) {
    var mouseX = mConstraint.mouse.position.x;
    var mouseY = mConstraint.mouse.position.y;

    createBall(mouseX, mouseY);
    changeGravity(mouseX, mouseY);
});

Events.on(mConstraint, "mousemove", function(event) {
    var mouseX = mConstraint.mouse.position.x;
    var mouseY = mConstraint.mouse.position.y;

    changeGravity(mouseX, mouseY);
});
              
var groundWall = Bodies.rectangle(screenWidth / 2, screenHeight, screenWidth, borderThickness, { isStatic: true });
var topWall = Bodies.rectangle(screenWidth / 2, 0, screenWidth, borderThickness, { isStatic: true });
var leftWall = Bodies.rectangle(0, screenHeight / 2, borderThickness, screenHeight, { isStatic: true });
var rightWall = Bodies.rectangle(screenWidth, screenHeight / 2, borderThickness, screenHeight, { isStatic: true });

World.add(engine.world, [groundWall, topWall, leftWall, rightWall]);

engine.world.scale = gravityScale;
 
Engine.run(engine);
Render.run(render);

addWords();

if ('ondeviceorientation' in window) {
    window.addEventListener('deviceorientation', function (event) {
        console.log(event.beta + ", " + event.gamma + ", " + event.alpha);
        console.log(event.absolute ? "true" : "false");

        var xGravity = event.gamma / 90;
        var yGravity = event.beta / 90;

        engine.world.gravity.x = xGravity;
        engine.world.gravity.y = yGravity;
    });
}

function addWords() {
    addWord(1);
}

function addWord(index) {
    if(index>82)
        return;

    var imagePath = "image/" + index + ".png";

    var img = new Image();

    img.onload = function(){
        var height = img.height;
        var width = img.width;

        console.log(index + " imagesize : "+ width+","+height);
        var xPos = Math.round(Math.random() * screenWidth);
        var yPos = Math.round(Math.random() * screenHeight);
        var imageBlock = Bodies.rectangle(xPos, yPos, width * imageScale, height * imageScale, {
            render: {
                sprite: {
                    texture: imagePath,
                    xScale: imageScale,
                    yScale: imageScale
                }
            }
        }
        );
        imageBlock.restitution = objectRestitution;
        World.add(engine.world, imageBlock);

        addWord(index+1);
    }

    img.src = imagePath = "image/" + index + ".png";
}

function changeGravity(xPos, yPos){
    var xGravity = (xPos / screenWidth) * 2 - 1;
    var yGravity = (yPos / screenHeight) * 2 - 1;
    engine.world.gravity.x = xGravity;
    engine.world.gravity.y = yGravity;
}

function createBall(xPos, yPos)
{
    var newBall = Bodies.circle(xPos, yPos, ballRadius, 10);
    var targetColor = Math.round(Math.random());
    newBall.render.fillStyle = colorArray[targetColor];
    newBall.restitution = objectRestitution;
    World.add(engine.world, newBall);
}