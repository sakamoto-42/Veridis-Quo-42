$(document).ready(function() {
	function randomColorChannel() {
		return Math.floor(Math.random() * 256);	
	}

	function randomAlphaChannel() {
		return Math.round(Math.random() * 100) / 100;
	}

	function randomRGBA() {
		let R = randomColorChannel();
		let G = randomColorChannel();
		let B = randomColorChannel();
		let A = randomAlphaChannel();
	
		return `rgba(${R}, ${G}, ${B}, ${A})`;
	}

	$("#random-bg-btn").on("click", function() {
		$("body").css("background-color", randomRGBA());
	});
});