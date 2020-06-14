var screenWidth = window.innerWidth;
var screenHeight =  window.innerHeight;
var borderThickness = 20;
var imageScale = 0.6;
var ballRadius = 20;

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
    console.log(mConstraint.mouse.position);

    var newBall = Bodies.circle(mConstraint.mouse.position.x, mConstraint.mouse.position.y, ballRadius, 10);
    var targetColor = Math.round(Math.random());
    newBall.render.fillStyle = colorArray[targetColor];
    newBall.restitution = 0.9;
    World.add(engine.world, newBall);
});
              
var groundWall = Bodies.rectangle(screenWidth / 2, screenHeight, screenWidth, borderThickness, { isStatic: true });
var topWall = Bodies.rectangle(screenWidth / 2, 0, screenWidth, borderThickness, { isStatic: true });
var leftWall = Bodies.rectangle(0, screenHeight / 2, borderThickness, screenHeight, { isStatic: true });
var rightWall = Bodies.rectangle(screenWidth, screenHeight / 2, borderThickness, screenHeight, { isStatic: true });

World.add(engine.world, [groundWall, topWall, leftWall, rightWall]);

engine.world.scale = 0.002;
 
Engine.run(engine);
Render.run(render);

addWords();

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
        imageBlock.restitution = 0.9;
        World.add(engine.world, imageBlock);

        addWord(index+1);
    }

    img.src = imagePath = "image/" + index + ".png";
}