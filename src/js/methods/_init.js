define(['jquery', 'instances/_instances'], function($, Instances) {
	var defaults = {
		prefix: "focusBox_",
		closeOnOverlayClick : true,
		pageWrapId : "pageWrap",
		overlayId : "focusBoxOverlay"
	},
	instances = Instances;

	return function(options) {
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;

		this.instances = instances();

		return this;
	};
});