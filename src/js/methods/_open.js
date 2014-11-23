define(['jquery'], function($) {
	function calculateScroll() {
		var positionX = (window.pageXOffset !== undefined) ?
			window.pageXOffset :
			(document.documentElement || document.body.parentNode || document.body).scrollLeft,
			positionY = (window.pageYOffset !== undefined) ?
			window.pageYOffset :
			(document.documentElement || document.body.parentNode || document.body).scrollTop;
		return {
			x: parseFloat(positionX) * -1,
			y: parseFloat(positionY) * -1
		};
	}

	// Wrap the page in a containing div so we can fix the scrolling position
	function pageWrap(pageWrapId) {
		var div = document.createElement("div");
		div.id = pageWrapId;

		// This method of moving the elements inside the container should retain events
		// See http://stackoverflow.com/a/1577863/1047398
		while (document.body.firstChild) {
			div.appendChild(document.body.firstChild);
		}
		document.body.appendChild(div);
		return $(div);
	}

	function fillOverlay(instance) {
		var content;
		this.current = instance;
		content = instance.render.apply(instance, Array.prototype.slice.call(arguments, 1));
		this.$overlay.append(content);
		return content;
	}

	// BUG: triggers only work once while they're also triggered by not targeted events, like other keys or click inside overlay
	function setCloseEvents(closeOn) {
		var that = this;
		if (closeOn.esc) {
			$(document).one('keyup.' + this._name, function(event) {
				if (event.which === 27) {
					event.preventDefault();
					that.close();
				}
			});
		}
		if (closeOn.overlay) {
			this.$overlay.one('click.' + this._name, function() {
				if (event.target == that.$overlay[0]) {
					event.preventDefault();
					that.close();
				}
			});
		}
	}

	return function(instance) {
		var content;
		if(this.current) {
			this.current.close();
			content = fillOverlay.apply(this, arguments);
			$(this).trigger('switched');
		} else {
			this.scroll = calculateScroll();
			this.$pageWrap = pageWrap(this.settings.prefix + this.settings.pageWrapId);
			this.$pageWrap.css({
				left: this.scroll.x,
				top: this.scroll.y
			});

			this.$body.append(this.$overlay, this.$overlayBg);
			this.$overlayBg.css({opacity: 0}).animate({opacity: 0.3}, 180);
			content = fillOverlay.apply(this, arguments);
			window.scrollTo(0, 0);

			setCloseEvents.call(this, this.settings.closeOn);
			$('html, body').addClass('hasOverlay');
			$(this).trigger('opened');
		}
		return content;
	};
});