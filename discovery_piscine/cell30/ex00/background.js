function randomColorChannel() {
	return Math.floor(Math.random() * 256);
}

function randomRGB() {
	let R = randomColorChannel();
	let G = randomColorChannel();	
	let B = randomColorChannel();			
	
	return `rgb(${R}, ${G}, ${B})`;
}

document.getElementById("random-bg-btn").addEventListener("click", function() {
	document.body.style.backgroundColor = randomRGB();
});