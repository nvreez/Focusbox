

require(['focusbox', 'jquery.focusbox', 'jquery'], function (Focusbox){

	$.focusbox = new Focusbox();

	$('[data-focusbox]').focusbox();

});

