let time = 0; // represents the angle
let wave = []; // this will hold the y values
let slider;

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
	slider = createSlider(1, 10, 1);
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	translate(windowWidth/3, windowHeight/2);

	let x = 0; 
	let y = 0;
	for(let i = 0; i < slider.value(); i++) {
		let prevX = x;
		let prevY = y;
		let n = i * 2 + 1;
		// polar to cartesian conversion
		let radius = 75 * (4 / (n * PI));
		x += radius * cos(n * time);
		y += radius * sin(n * time);
		
		// draw circle
		stroke(255, 100);
		noFill();
		ellipse(prevX, prevY, radius * 2);

		stroke(255);
		line(prevX, prevY, x, y);
		// ellipse(x, y, 8);
	}

	wave.unshift(y); // storing y values here, add to beginning
	translate(200, 0); // draw wave to the side
	line(x - 200, y, 0, wave[0]);

	beginShape();
	noFill();
	for(let i = 0; i < wave.length; i++) {
		vertex(i, wave[i]);
	} 
	endShape();

	time += 0.04;

	if(wave.length > 500) {
		wave.pop(); // delete last point
	}
}