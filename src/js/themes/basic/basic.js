define(['text!themes/basic/_template.html', 'jquery'], function(template) {
	var defaults = {},
		themeName = "Basic";

	function Basic(parent, options) {
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this.parent = parent;
		this.$template = $(template);
		this.init();
	}

	$.extend(true, Basic.prototype, {
		init: function() {
			this.$content = this.$template.find(".content");
			this.$close = this.$template.find(".close");
		},
		open: function(content) {
			this.$close.on("click." + themeName, function (event) {
				event.preventDefault();
				$.focusbox.close();
			});
			return $.focusbox.open(this, content);
		},
		render: function(content) {
			this.$content.html(content);
			var that = this,
				height, viewHeight;

			this.$template.css({opacity: 0});

			// Make sure this.$template has content to calculate its height
			window.setTimeout(function(){
				height = that.$template.outerHeight();

				that.$template.stop(true, true).css({height: 0}).animate({opacity: 1}, 100, function(){
					viewHeight = $(window).height();

					height = Math.min(height, viewHeight);

					that.$template.stop(true, true).animate({height: height}, 230, function(){
						that.$template.css('height', 'auto');
					});
				});
			}, 1);
			return this.$template;
		},
		close: function() {
			var that = this;
			this.$close.off("click." + themeName);
			this.$template.stop(true, true).animate({opacity: 0}, 200, function() {
				$(that).trigger("closed");
			});
		},
		remove: function() {
			this.$close.off("click." + themeName);
			this.$template.stop(true, true);
		}
	});

	return {
		theme: Basic,
		name: themeName
	};
});