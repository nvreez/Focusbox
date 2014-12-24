define([
	'methods/_init',
	'methods/_open',
	'methods/_close',
	'methods/_options',
	'jquery'
], function(
	methodInit,
	methodOpen,
	methodClose,
	methodOptions
) {
	var pluginName = "Focusbox",
		defaults = {
			prefix: "focusbox_",
			closeOn: {
				overlay: true,
				esc: true
			},
			pageWrapId : "pageWrap",
			overlayId : "overlay",
			overlayBgId : "overlayBg"
		};

	function Focusbox (options) {
		this.settings = $.extend(true, {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Focusbox.prototype, {
		init: methodInit,
		open: methodOpen,
		close: methodClose,
		options: methodOptions
	});


    return Focusbox;
});