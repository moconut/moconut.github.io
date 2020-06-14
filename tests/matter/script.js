var screenWidth = 800;
var screenHeight = 800;
var borderThickness = 20;

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
     
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
              
var boxA = Bodies.rectangle(400, 200, 80, 80);
boxA.restitution = 0.9;
var ballA = Bodies.circle(380, 100, 40, 10);
ballA.restitution = 0.9;
var ballB = Bodies.circle(460, 10, 40, 10);
ballB.restitution = 0.9;
var groundWall = Bodies.rectangle(screenWidth / 2, screenHeight, screenWidth, borderThickness, { isStatic: true });
var topWall = Bodies.rectangle(screenWidth / 2, 0, screenWidth, borderThickness, { isStatic: true });
var leftWall = Bodies.rectangle(0, screenHeight / 2, borderThickness, screenHeight, { isStatic: true });
var rightWall = Bodies.rectangle(screenWidth, screenHeight / 2, borderThickness, screenHeight, { isStatic: true });

var imageBlock = Bodies.rectangle(500, 500, 65, 94, {
    render: {
        sprite: {
            texture: 'image/1.png',
            xScale: 1,
            yScale: 1
        }
    }
}
);
imageBlock.restitution = 0.9;
 
World.add(engine.world, [boxA, ballA, ballB, groundWall, topWall, leftWall, rightWall, imageBlock]);

engine.world.scale = 0.002;
 
Engine.run(engine);
Render.run(render);