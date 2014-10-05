/**
 * Return scroll position of the window
 * @return {function} scrollPosition
 */
define([], function() {
	return function(){
		var position = (window.pageYOffset !== undefined) ?
			window.pageYOffset :
			(document.documentElement || document.body.parentNode || document.body).scrollTop;
		return parseFloat(position) * -1;
	};
});