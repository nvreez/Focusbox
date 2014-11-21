define(['jquery', 'instances/_instances'], function($, Instances) {
	var instances = Instances;

	return function() {
		this.$body = $('body');
		this.$overlay = $(document.createElement('div'))
			.attr('id', this.settings.prefix + this.settings.overlayId);
		this.$overlayBg = $(document.createElement('div'))
			.attr('id', this.settings.prefix + this.settings.overlayBgId);

		this.instances = instances();

		return this;
	};
});