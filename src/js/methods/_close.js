// <div id="pageWrap">
// 	<!-- Original page content -->
// </div>
// <div id="focusboxOverlay">

define(['jquery'], function($) {

	return function() {
		var pageWrap = this.$pageWrap[0],
			that = this;

		// Put content out of the wrapper back into the body
		while (pageWrap.firstChild) {
			document.body.appendChild(pageWrap.firstChild);
		}
		window.scrollTo(0, -this.scrollY);
		this.$pageWrap.remove();

		$(this.current).one("closed", function(){
			that.current = null;
			that.$overlay.empty().detach();
			$(that).trigger("closed");
		});
		this.current.close();

		return this;
	};
});