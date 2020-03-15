$.parallax.enableTouchDevices = true;

const RAINBOW_NUMBER = 70;
const RAINBOW_START = 80;
const RAINBOW_MARGIN = 5;

const STAR_NUMBER = 70;
const STAR_POS_RANGE = 40;
const STAR_MIN_SPEED = 150;
const STAR_MAX_SPEED = 300;
const STAR_MAX_MARGIN = 20;
const STAR_MIN_MARGIN = 10;

var rainbowType = 1;
for (i = 0; i < RAINBOW_NUMBER; i++) {
    var current = RAINBOW_START - (i * RAINBOW_MARGIN);
    var newRainbow = `<div class='rainbow${rainbowType}' data-parallax='{"x":"-100vw", "trigger":"${current}%", "start":"#cat-scene", "duration":"200vh"}'><img src="rainbowhalf.png"></div>`
    $('#rainbow-container').append(newRainbow);

    if(rainbowType == 1)
        rainbowType = 2;
    else
        rainbowType = 1;
}

var currentTrigger = 150;
for (i = 0; i<STAR_NUMBER; i++) {
    var pos = Math.floor(Math.random() * STAR_POS_RANGE * 2) - STAR_POS_RANGE; // -30 ~ 30
    var speed = Math.floor(Math.random() * (STAR_MAX_SPEED - STAR_MIN_SPEED)) + STAR_MIN_SPEED; // 150 ~ 300;
    var margin = Math.floor(Math.random() * (STAR_MAX_MARGIN - STAR_MIN_MARGIN)) + STAR_MIN_MARGIN
    var newRainbow = `<div class='star' style='top:${pos}vh;' data-parallax='{"x":"-130vw", "trigger":"${currentTrigger}%", "start":"#cat-scene", "duration":"${speed}vh"}'><img src="star.gif"></div>`
    $('#rainbow-container').append(newRainbow);

    currentTrigger -= margin;
}