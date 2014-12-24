
// require.config({
//     baseUrl: '/../src/js',
//     paths: {
//         bower: '../../bower_components',
//         jquery: '../../bower_components/jquery/dist/jquery.min',
//         text: 'plugins/text'
//     }
// });



require(['focusbox', 'jquery.focusbox', 'jquery'], function (Focusbox){

	$.focusbox = new Focusbox();

	$('[data-focusbox]').focusbox();
});

