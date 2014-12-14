
require.config({
    baseUrl: '/../src/js',
    paths: {
        bower: '/../bower_components',
        jquery: '/../bower_components/jquery/dist/jquery.min',
        text: 'plugins/text'
    }
});



require(['jquery', 'focusbox', 'jquery.focusbox'], function ($, Focusbox){

	$.focusbox = new Focusbox();

	$('[data-focusbox]').focusbox();

	$('#toggleData').click(function(event){
		event.preventDefault();
		$("nav").toggleClass('is-showData');
	});
});

