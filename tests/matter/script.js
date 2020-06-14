const screenWidth = window.innerWidth; // 화면 가로 크기
const screenHeight =  window.innerHeight; // 화면 세로 크기

const borderThickness = 40; // 상하좌우 벽 굵기
const ballRadiusMin = 15; // 생성되는 원의 지름 최소
const ballRadiusMax = 60; // 생성되는 원의 지름 최대
const imageScale = 1; // 글자 이미지 스케일
const BallRestitution = 1; // 공의 탄성
const WordRestitution = 0.5; // 공의 탄성
const gravityScale = 0.002; // 중력 세기

var colorArray = []; // 랜덤으로 선택될 공 색상들
colorArray.push('rgb(0, 0, 0)');
colorArray.push('rgb(21, 105, 255)');

// 엔진 초기화
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

// 마우스 이벤트 설정
var bodyMouse = Mouse.create(document.body);
var options = {
  mouse: bodyMouse
};
mConstraint = MouseConstraint.create(engine, options);
World.add(engine.world, mConstraint);

// 마우스 클릭 시 이벤트 등록
Events.on(mConstraint, "mousedown", function(event) {
    var mouseX = mConstraint.mouse.position.x;
    var mouseY = mConstraint.mouse.position.y;

    //공 생성
    createBall(mouseX, mouseY);
    //중력 방향 변화
    changeGravity(mouseX, mouseY);
});

// 마우스 움직였을 때 이벤트 등록
Events.on(mConstraint, "mousemove", function(event) {
    var mouseX = mConstraint.mouse.position.x;
    var mouseY = mConstraint.mouse.position.y;

    //중력 뱡향 변화
    changeGravity(mouseX, mouseY);
});
              
// 상, 하, 좌, 우 벽 생성
var groundWall = Bodies.rectangle(screenWidth / 2, screenHeight, screenWidth, borderThickness, { isStatic: true });
groundWall.render.fillStyle = 'rgb(255,255,255)';
var topWall = Bodies.rectangle(screenWidth / 2, 0, screenWidth, borderThickness, { isStatic: true });
topWall.render.fillStyle = 'rgb(255,255,255)';
var leftWall = Bodies.rectangle(0, screenHeight / 2, borderThickness, screenHeight, { isStatic: true });
leftWall.render.fillStyle = 'rgb(255,255,255)';
var rightWall = Bodies.rectangle(screenWidth, screenHeight / 2, borderThickness, screenHeight, { isStatic: true });
rightWall.render.fillStyle = 'rgb(255,255,255)';
World.add(engine.world, [groundWall, topWall, leftWall, rightWall]);

// 중력 세기 설정
engine.world.gravity.scale = gravityScale;
 
// 엔진 시작
Engine.run(engine);
Render.run(render);

addWords();

// 기울임 이벤트 지원하는 기기에 한해서 기울임 시 이벤트 등록
if ('ondeviceorientation' in window) {
    window.addEventListener('deviceorientation', function (event) {
        console.log(event.beta + ", " + event.gamma + ", " + event.alpha);
        console.log(event.absolute ? "true" : "false");

        // 기울임 상태 읽어서 -1 ~ 1 값으로 변환
        var xGravity = event.gamma / 90;
        var yGravity = event.beta / 90;

        // 중력 방향 변화
        engine.world.gravity.x = xGravity;
        engine.world.gravity.y = yGravity;
    });
}

// 글자 생성
function addWords() {
    addWord(1);
}

// 글자 생성(재귀호출). 이미지가 로드되는 대로 화면에 추가함.
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
        imageBlock.restitution = WordRestitution;
        World.add(engine.world, imageBlock);

        addWord(index+1);
    }

    img.src = imagePath = "image/" + index + ".png";
}

// 중력 방향 변화
function changeGravity(xPos, yPos){
    var xGravity = (xPos / screenWidth) * 2 - 1;
    var yGravity = (yPos / screenHeight) * 2 - 1;
    engine.world.gravity.x = xGravity;
    engine.world.gravity.y = yGravity;
}

// 공 생성
function createBall(xPos, yPos)
{
    var targetColor = Math.round(Math.random() * (colorArray.length - 1));
    var targetSize = Math.round(ballRadiusMin + Math.random() * (ballRadiusMax - ballRadiusMin));
    var newBall = Bodies.circle(xPos, yPos, targetSize, 10);
    newBall.render.fillStyle = colorArray[targetColor];
    newBall.restitution = BallRestitution;
    World.add(engine.world, newBall);
}