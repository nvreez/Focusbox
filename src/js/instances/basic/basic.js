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
		},
		open: function(content) {
			this.$close.on("click." + this._name, function (event) {
				event.preventDefault();
				$.focusbox.close();
			});

			var that = this;

			switch (content.type) {
				case "ajax":
					content = content.data;
					return $.ajax({
						url: content.url,
						data: content.data,
						type: content.type,
						success: function(data) {
							$.focusbox.open(that, data);
						}
					});
				case "selector":
					content = $(content.data).html();
					break;
				case "html":
					content = content.data;
					break;
			}
			return $.focusbox.open(this, content);
		},
		render: function(content) {
			this.$content.html(content);
			var that = this;
			this.$template.css({height: 0, opacity: 0});

			this.$template.animate({opacity: 1}, 100, function(){
				var viewHeight = $(window).height(),
					height = Math.min(that.$content.height(), viewHeight);

				that.$template.animate({height: height}, 230, function(){
					that.$template.css('height', 'auto');
				});
			});
			return this.$template;
		},
		close: function() {
			this.$close.off("click." + this._name);
			var that = this;
			this.$template.animate({opacity: 0}, 200, function() {
				$(that).trigger("closed");
			});
		},
		remove: function() {}
	});

	return Basic;
});