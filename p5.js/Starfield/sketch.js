
var stars = [];

var speed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  speed = map(mouseX, 0, width, 0, 50);
  background(0);
  translate(windowWidth / 2, windowHeight / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

// checks to see if the window size has been changed during each iteration
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}