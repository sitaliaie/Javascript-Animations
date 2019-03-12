function dft(x) { // will calculate the discrete fourier transform
	let X = [];
	const N = x.length;
	for(let k = 0; k < N; k++) {
		let real = 0;
		let imaginary = 0;
		for(let n = 0; n < N; n++) {
			const phi = (TWO_PI * k * n) / N
			real += x[n] * cos(phi);
			imaginary -= x[n] * sin(phi);
		}
		real = real / N;
		imaginary = imaginary / N;
		let frequency = k;
		let amplitude = sqrt(pow(real, 2) + pow(imaginary, 2));
		let phase = atan2(imaginary, real);
		X[k] = {real, imaginary, frequency, amplitude, phase};
	}
	return X;
}

