define(['jquery'], function($) {
	function calculateScroll() {
		var position = (window.pageYOffset !== undefined) ?
			window.pageYOffset :
			(document.documentElement || document.body.parentNode || document.body).scrollTop;
		return parseFloat(position) * -1;
	}

	function pageWrap() { // Wrap the page in a containing div to fix the scrolling position
		var div = document.createElement("div");
		div.id = "pageWrap";
		while (document.body.firstChild) { // This method of moving the elements inside the container should retain events
			div.appendChild(document.body.firstChild);
		}
		document.body.appendChild(div);
		$pageWrap = $(div);
	}

	return function(){

	};
});