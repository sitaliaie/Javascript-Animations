let time = 0; 
let path = []; 
let signalX = [];
let signalY = [];
let fourierX;
let fourierY;

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
	for(let i = 0; i < drawing.length; i++) {
		signalX.push(3*drawing[i].x);
		signalY.push(-3*drawing[i].y + 200);
	}
	fourierX = dft(signalX);
	fourierY = dft(signalY);

	fourierX.sort((a, b) => b.amplitude - a.amplitude);
	fourierY.sort((a, b) => b.amplitude - a.amplitude);
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
  	path = [];
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
	//translate(windowWidth/3, windowHeight/2);
	let vx = epicylces(windowWidth / 2 + 100, 100, 0, fourierX);
	let vy = epicylces(200, windowHeight / 2 + 100, HALF_PI, fourierY);
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

	// if(wave.length > 500) {
	// 	wave.pop(); // delete last point
	// }
}