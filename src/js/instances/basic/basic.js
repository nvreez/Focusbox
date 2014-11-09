define(['jquery', 'text!instances/basic/_template.html'], function($, template) {
	var defaults = {};

	function Basic(parent, options) {
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = "Basic";
		this.parent = parent;
		this.$template = $(template);
		this.init();
	}

	$.extend(true, Basic.prototype, {
		init: function() {
			this.$content = this.$template.find(".content");
			this.$close = this.$template.find(".close");
			this.$close.on("click." + this._name, function (event) {
				event.preventDefault();
				$.focusbox.close();
			});
		},
		open: function(content) {
			if (content.selector === undefined) {
				content = content.text || content.ajax;
			} else {
				content = $(content.selector).html();
			}
			return $.focusbox.open(this, content);
		},
		render: function(content) {
			this.$content.html(content);
			var that = this;
			this.$template.css({height: 0});
			window.setTimeout(function(){
				var viewHeight = window.height,
					height = that.$content.height();
				console.log("basic.js:33", height);
				that.$template.animate({height: height}, 200, function(){
					// that.$template.css('height', 'auto');
				});
			}, 1);
			return this.$template;
		},
		close: function() {
			this.$close.off("click." + this._name);
			var that = this;
			this.$template.animate({opacity: 1}, 200, function() {
				$(that).trigger("closed");
			});
		},
		remove: function() {}
	});

	return Basic;
});