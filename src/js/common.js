
require.config({
    baseUrl: '/../src/js',
    paths: {
        bower: '/../bower_components',
        jquery: '/../bower_components/jquery/dist/jquery.min',
        text: 'plugins/text'
    }
});



require(['jquery', 'focusbox'], function ($, Focusbox){

	$.focusbox = new Focusbox();

	focusBasic = new $.focusbox.instances.Basic();

	$('[data-focusbox]').click(function(event){
		event.preventDefault();
		focusBasic.open($(this).data('focusbox'));
	});
});

