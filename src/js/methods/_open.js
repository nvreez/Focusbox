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
			this.current = instance;
			content = instance.render.apply(instance, Array.prototype.slice.call(arguments, 1));
			this.$overlay[0].appendChild(content[0]);
			$(this).trigger('switched');
		} else {
			this.scroll = calculateScroll();
			this.$pageWrap = pageWrap(this.settings.prefix + this.settings.pageWrapId);
			this.$pageWrap.css({
				left: this.scroll.x,
				top: this.scroll.y
			});

			this.current = instance;
			document.body.appendChild(this.$overlay[0]);

			content = instance.render.apply(instance, Array.prototype.slice.call(arguments, 1));
			this.$overlay[0].appendChild(content[0]);
			window.scrollTo(0, 0);

			setCloseEvents.call(this, this.settings.closeOn);
			$('html, body').addClass('hasOverlay');
			$(this).trigger('opened');
		}
	};
});