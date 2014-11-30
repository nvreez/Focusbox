define(['jquery', 'themes/_themes'], function($, Instances) {
	var themes = Instances;

	return function() {
		this.$body = $('body');
		this.$overlay = $(document.createElement('div'))
			.attr('id', this.settings.prefix + this.settings.overlayId);
		this.$overlayBg = $(document.createElement('div'))
			.attr('id', this.settings.prefix + this.settings.overlayBgId);

		this.themes = themes();

		return this;
	};
});