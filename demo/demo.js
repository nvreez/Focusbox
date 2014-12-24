(function(){
	document.getElementById("toggleData").addEventListener("click", function(event){
		if (event.preventDefault()) event.preventDefault();

		classToggle(document.getElementById("tests"), 'is-showData');
	});


	// Addapted from http://ryanfitzer.org/2011/02/toggle-class-the-jquery-way-vs-the-native-way/
	classToggle = function( element, tclass ) {

	    var classes = element.className,
	        pattern = new RegExp( tclass );
	        hasClass = pattern.test( classes );

	    classes = hasClass ? classes.replace( pattern, '' ) : classes + ' ' + tclass;
	    element.className = classes.trim();
	};
})();