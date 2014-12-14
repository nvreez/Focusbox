define(['jquery', 'focusbox'], function($, Focusbox) {
	function BindFocusbox(element, eventType) {
		var $this = $(element),
			data = $this.data('focusbox'),
			content,
			theme;

		eventType = eventType || "click.focusBox";

		switch (data.type) {
			case "ajax":
				data = data.data;
				theme = new $.focusbox.themes.Basic();

				$this.on(eventType, function (e) {
					e.preventDefault();
					$.ajax({
						url: data.url,
						data: data.data,
						type: data.type,
						success: function(data) {
							theme.open(data);
						}
					});
				});
				return;
			case "selector":
				content = $(data.data).html();
				theme = new $.focusbox.themes.Basic();
				break;
			case "html":
				content = data.data;
				theme = new $.focusbox.themes.Basic();
				break;
		}


		$this.on(eventType, function (e) {
			e.preventDefault();
			theme.open(content);
		});

		return element;
	}

	$.fn.focusbox = function(eventType) {
		return this.each(function () {
			if (!$.data(this, 'plugin_focusbox')) {
				$.data(this, 'plugin_focusbox',
					new BindFocusbox(this, eventType));
			}
		});
	};
});