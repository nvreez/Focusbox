define(['jquery'], function($) {
	return function(options){
		this.settings = $.extend(true, {}, this.settings, options);
		this.$overlay.attr('id', this.settings.prefix + this.settings.overlayId);

		if (!this.settings.closeOn.esc) {
			$(document).off('keyup.' + this._name);
		}
		if (!this.settings.closeOn.overlay) {
			this.$overlay.off('click.' + this._name);
		}
		return this;
	};
});