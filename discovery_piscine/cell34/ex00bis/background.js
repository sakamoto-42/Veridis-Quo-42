$(document).ready(function() {
	function randomColorChannel() {
		return Math.floor(Math.random() * 256);	
	}

	function randomRGB() {
		let R = randomColorChannel();
		let G = randomColorChannel();
		let B = randomColorChannel();
	
		return `rgb(${R}, ${G}, ${B})`;
	}

	$("#random-bg-btn").on("click", function() {
		$("body").css("background-color", randomRGB());
	});
});