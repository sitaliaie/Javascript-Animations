let time = 0; 
let path = []; 
let signalX = [];
let signalY = [];
let fourierX;
let fourierY;
const USER = 0;
const FOURIER = 1;
let drawing = [];
let state = -1;

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
  	path = [];
}

function mousePressed() {
	state = USER;
	drawing = [];
	signalX = [];
	signalY = [];
	time = 0;
	path = [];
}

function mouseReleased(){
	state = FOURIER;
	const skip = 1;
	for(let i = 0; i < drawing.length; i += skip) {
		signalX.push(drawing[i].x);
		signalY.push(drawing[i].y);
	}
	fourierX = dft(signalX);
	fourierY = dft(signalY);

	fourierX.sort((a, b) => b.amplitude - a.amplitude);
	fourierY.sort((a, b) => b.amplitude - a.amplitude);
}

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
	state = -1;
}

function epicylces(x, y, rotation, fourier) {
	for(let i = 0; i < fourier.length; i++) {
		let prevX = x;
		let prevY = y;

		let freq = fourier[i].frequency;
		let radius = fourier[i].amplitude;
		let phase = fourier[i].phase;

		x += radius * cos(freq * time + phase + rotation);
		y += radius * sin(freq * time + phase + rotation);
		
		stroke(255, 100);
		noFill();
		ellipse(prevX, prevY, radius * 2);
		stroke(255);
		line(prevX, prevY, x, y);
	}
	return createVector(x, y);

}
function draw() {
	background(0);
	if(state == USER) {
		let point = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);
		drawing.push(point);
		stroke(255);
		noFill();
		beginShape();
		for(let v of drawing) {
			vertex(v.x + windowWidth / 2, v.y + windowHeight / 2);
		}
		endShape();
	} 
	else if(state == FOURIER) {
		//translate(windowWidth/3, windowHeight/2);
		let vx = epicylces(windowWidth / 2, 100, 0, fourierX);
		let vy = epicylces(200, windowHeight / 2, HALF_PI, fourierY);
		let v = createVector(vx.x, vy.y);

		path.unshift(v); 
		// translate(200, 0); 
		line(vx.x, vx.y, v.x, v.y);
		line(vy.x, vy.y, v.x, v.y);

		beginShape();
		noFill();
		for(let i = 0; i < path.length; i++) {
			vertex(path[i].x, path[i].y);
		} 
		endShape();

		const dt = TWO_PI / fourierY.length;
		time += dt;

		if(time > TWO_PI) {
			time = 0;
			path = [];
		}
	}
	// if(wave.length > 500) {
	// 	wave.pop(); // delete last point
	// }
}