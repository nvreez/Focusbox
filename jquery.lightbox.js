/**
 * Lightbox
 * Nathan de Vries, 2014
 */
(function ($) {
	var $lightbox = $('<div id="lightboxOverlay"><div class="lightbox"><a class="close">&nbsp;</a><article class="content"></article></div></div>'),
		$lightboxBox = $lightbox.find(".lightbox"),
		$overlayFixedBodyWrapper,
		$pageWrap,
		ajaxCall, // Scoped global for ajax calls, so they can be aborted if necessary
		onClose = [];

	$lightbox.find('.close').on("click", function () { // Binds close event to close button
		$.lightbox('close');
	});

	$lightbox.on('click', function (event) { // Binds a close-event to the background overlay
		if (event.target == $lightbox[0]) {
			$.lightbox('close');
		}
	});

	function cleanup() {
		if (ajaxCall) { // Aborts earlier ajax calls if they did not yet complete
			ajaxCall.abort();
			ajaxCall = undefined;
		}

		$(document).off('keyDown_lightbox', onKeyDown);
	}

	function pageWrap (argument) { // Wrap the page in a containing div to fix the scrolling position
		var div = document.createElement("div");
		div.id = "pageWrap";
		while (document.body.firstChild) { // This method of moving the elements inside the container should retain events
			div.appendChild(document.body.firstChild);
		}
		document.body.appendChild(div);
		$pageWrap = $(div);
	}

	function openOverlay(content, onLoad) {
		var $body = $('body'),
			scrollY = window.scrollY;
		if (!$overlayFixedBodyWrapper) {
			$overlayFixedBodyWrapper = $("<div id='overlayFixedBodyWrapper' />");
			$body.append($overlayFixedBodyWrapper);
		}


		if (!$pageWrap) { // Check if the page is already wrapped
			pageWrap();
		}


		//Add content to lightbox
		$lightbox.find('.content').html(content);

		if ($('html').hasClass("hasOverlay")) {
			$lightboxBox.find("article").stop(true, true).animate({ "opacity": 0.5 }, 50).animate({ "opacity": 1 }, 100);
		} else {
			var scroll = getScroll();
			$('html, body').addClass('hasOverlay');
			$pageWrap.css("top", scroll);

			//Add and show lightbox
			$body.append($lightbox);
			$lightbox.stop(true, true).fadeOut(0);  //Set as invisible first
			$lightbox.fadeIn(250); //Make visible
		}


		if (onLoad) {
			var func = "functionLoad = " + onLoad;
			eval(func);
			functionLoad();
		}

		$(document).on('keyDown_lightbox', onKeyDown);
	}

	function closeOverlay() {
		$lightbox.fadeOut(300, function () {
			$('body').append($overlayFixedBodyWrapper.children());

			var pageWrap = $pageWrap[0];
			while (pageWrap.firstChild) {
				document.body.appendChild(pageWrap.firstChild);
			}

			var scrollTop = -parseInt($pageWrap.css('top'));
			window.scrollTo(0, scrollTop);
			$pageWrap.remove();
			$pageWrap = false;

			$('html, body').removeClass('hasOverlay');
			$(document).off('keyDown_lightbox', onKeyDown);

			if (onClose.length) {
				for (var i = onClose.length - 1; i >= 0; i--) {
					methods[onClose[i].method].apply(this, onClose[i].arg);
				};
				onClose = [];
			}
			$(document).trigger("lightboxClosed");
		});
	}

	function onKeyDown(event) { // Close Overlay when pressing the ESC key
		if (event.which == 27) {
			closeOverlay();
		}
	}

	function getScroll() {
		var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		return parseFloat(y) * -1;
	}

	var methods = {
		openContent: function (content, onLoad) {
			cleanup();
			openOverlay(content, onLoad);
		},

		openAjax: function (url, POSTdata, contentSelector) {
			cleanup();
			var POSTdata = POSTdata || {};

			ajaxCall = $.ajax({
				url: url,
				type: "POST",
				data: POSTdata,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					var html = data.d.html || data;
					var onLoad = data.d.onLoad || false;
					var $response = $(html),
						$content = $response;

					if (contentSelector) {
						//Either filter or find the content, depending on where the content is nested
						$content = $response.filter(contentSelector);
						if ($content.length == 0) {
							$content = $response.find(contentSelector);
						}
					}

					ajaxCall = undefined;
					openOverlay($content, onLoad);
				}
			})
		},

		openIframe: function (url, onLoad) {
			cleanup();
			openOverlay($("<iframe src='" + url + "' frameborder='0' />"), onLoad)
		},

		addClass: function (className) {
			$lightbox.addClass(className);
		},

		removeClass: function (className) {
			$lightbox.removeClass(className);
		},

		css: function (css) {
			$lightbox.find('.lightbox').css(css);
		},

		resetStyles: function () {
			$lightbox.attr('class', '');
			$lightbox.find('.lightbox').attr('style', '');
		},

		close: function () {
			closeOverlay();
			cleanup();
		},

		onClose: function (method, handle) { // method, handle, arguments
			if (methods[method]) {
				if (!handle) {
					arguments.splice(1, 0, false);
				} else {
					methods.offClose(handle);
				}
				var func = {
					handle: handle,
					method: method,
					arg: Array.prototype.slice.call(arguments, 2)
				}
				onClose.push(func);
				return true;
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.lightbox');
			}
		},

		offClose: function (handle) {
			for (var i = onClose.length - 1; i >= 0; i--) {
				if (onClose[i].handle == handle) {
					onClose.splice(i, 1);
				}
			};
		},

		getScroll: function () {
			console.log(getScroll());
		},

		func: function (func) {
			return func();
		}
	};

	$.lightbox = function (method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.lightbox');
		}
	};

	function BindLightbox(element) {
		var $this = $(element),
			POSTdata = $this.data("lightbox");

		$this.on("click", function (e) {
			e.preventDefault();
			$.lightbox("openAjax", "://AJAX_URL", POSTdata);
		});
	}

	$.fn.lightbox = function (className) {
		return this.each(function () {
			if (!$.data(this, 'plugin_lightbox')) {
				$.data(this, 'plugin_lightbox',
					new BindLightbox(this, className));
			}
		});
	};
})(jQuery);