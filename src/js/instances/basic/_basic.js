define(['jquery', 'text!instances/basic/_template.html'], function($, template) {
	var defaults = {};

	function Basic(options) {
		console.log("_basic.js:5", arguments);
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = "Basic";
		this.$template = $(template);
		this.init();
	}

	$.extend(true, Basic.prototype, {
		init: function() {
			this.$content = this.$template.find(".content");
			this.$close = this.$template.find(".close");

			var that = this;
			this.$close.on("click."+this._name, function (event) {
				event.preventDefault();
				that.close();
			});
		},
		open: function(content) {
			this.$content.html(content);
			return this.$template;
		},
		render: function(content) {
			this.$content.html(content);
			return this.$template;
		},
		close: function() {
			this.remove();
			$.focusBox("close");
		},
		remove: function() {}
	});

	return Basic;
});