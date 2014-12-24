// <div id="pageWrap">
// 	<!-- Original page content -->
// </div>
// <div id="focusboxOverlay">

define(['jquery'], function() {

	return function() {
		var pageWrap = this.$pageWrap[0],
			that = this;

		$(this.current).one("closed", function(){
			// Put content out of the wrapper back into the body
			while (pageWrap.firstChild) {
				document.body.appendChild(pageWrap.firstChild);
			}
			window.scrollTo(-that.scroll.x, -that.scroll.y);
			that.$pageWrap.remove();

			that.$overlayBg.stop(true, true).animate({opacity: 0}, 160, function(){
				that.current = null;
				that.$overlay.add(that.$overlayBg).empty().detach();
				$('html, body').removeClass('hasOverlay');
				$(that).trigger("closed");
			});
		});
		this.current.close();

		return this;
	};
});