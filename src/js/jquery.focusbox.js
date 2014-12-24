define(['jquery', 'focusbox'], function($, Focusbox) {
	function BindFocusbox(element, eventType) {
		this.element = $(element);
		this.data = this.element.data('focusbox');
		this.eventType = eventType || "click.focusBox";

		this.init();

		return this;
	}


	$.extend(true, BindFocusbox.prototype, {
		init: function() {
			var that = this;
			switch (this.data.type) {
				case "ajax":
					var data = this.data.data;
					this.theme = new $.focusbox.themes.Basic();

					this.element.on(this.eventType, function (e) {
						e.preventDefault();
						$.ajax({
							url: data.url,
							data: data.data,
							type: data.type,
							success: function(data) {
								that.theme.open(data);
							}
						});
					});
					return;
				case "selector":
					this.content = $(this.data.data).html();
					this.theme = new $.focusbox.themes.Basic();
					break;
				case "html":
					this.content = this.data.data;
					this.theme = new $.focusbox.themes.Basic();
					break;
			}

			this.element.on(this.eventType, function(e) {
				e.preventDefault();
				that.theme.open(that.content);
			});
		},
		unbind: function() {
			this.element.off(this.eventType);
		}
	});


	$.fn.focusbox = function(eventType) {
		if (arguments[0] == "unbind") {
			return this.each(function() {
				if ($.data(this, 'plugin_focusbox')) {
					$.data(this, 'plugin_focusbox').unbind();
				}
			});
		}
		return this.each(function () {
			if (!$.data(this, 'plugin_focusbox')) {
				$.data(this, 'plugin_focusbox', new BindFocusbox(this, eventType));
			}
		});
	};
});