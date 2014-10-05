define([
	'jquery',
	'methods/_init',
	'methods/_instance',
	'methods/_open',
	'methods/_close',
	'methods/_options'
], function(
	$,
	methodInit,
	methodInstance,
	methodOpen,
	methodClose,
	methodOptions
) {
	/**
	 * FocusBox main function. First-time call will initialise automatically
	 * and allows options as argument. Future calls will only accept methods
	 * as first argument
	 * @param {[string]} method Method to use
	 * @param {[object]} options Options of the method to use
	 */
    var FocusBox = function(method) {
	    	return handler.apply(this, arguments);
	    },

	    handler = function() {
	    	// Morph handler for future use
	    	handler = function(method) {
		    	if (methods[method]) {
					return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
				} else {
					$.error('Method ' + method + ' does not exist on jQuery.focusBox');
				}
		    };

		    // Call methods.init() and optionally other methods - only run on first time
	    	if(typeof arguments[0] === "string") {
		    	if(arguments[0] != "init") {
		    		methods.init.apply(this);
		    	}
	    		return handler.apply(this, arguments);
	    	} else {
		    	return methods.init.apply(this, arguments);
	    	}
	    },

	    methods = {
			init: methodInit,
			instance: methodInstance,
			open: methodOpen,
			close: methodClose,
			options: methodOptions
		};

    return FocusBox;
});