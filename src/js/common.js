
require.config({
    baseUrl: '/../src/js',
    paths: {
        bower: '/../bower_components',
        jquery: '/../bower_components/jquery/dist/jquery.min',
        text: 'plugins/text'
    }
});



require(['jquery', 'focusbox'], function ($, FocusBox){
	/**
	 * $.focusBox([global options], [instance type[, instance options]]);
	 */
	/*$.focusBox = function () {
		if(typeof arguments[0] === 'string') {
			window.focusBox = window.focusBox || new FocusBox();

			return window.focusBox.instance(arguments[0], arguments[1]);
		}

		if(window.focusBox) {
			window.focusBox.update(arguments[0]);
		} else {
			window.focusBox = new FocusBox(arguments[0]);
		}

		if(typeof arguments[1] === 'string') {
			return window.focusBox.instance(arguments[1], arguments[2]);
		}
	};*/

	$.focusBox = FocusBox;
});

