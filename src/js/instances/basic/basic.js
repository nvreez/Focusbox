define(['jquery', 'text!instances/basic/_template.html'], function($, template) {
	var defaults = {};

	function Basic(parent, options) {
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = "Basic";
		this.parent = parent;
		this.$template = $(template);
		this.init();
	}

	$.extend(true, Basic.prototype, {
		init: function() {
			this.$content = this.$template.find(".content");
			this.$close = this.$template.find(".close");
			this.$close.on("click." + this._name, function (event) {
				event.preventDefault();
				$.focusbox.close();
			});
		},
		open: function(content) {
			content = content.text || content.selector || content.ajax;
			return $.focusbox.open(this, content);
		},
		render: function(content) {
			this.$content.html(content);
			return this.$template;
		},
		close: function() {
			this.$close.off("click." + this._name);
			$(this).trigger("closed");
		},
		remove: function() {}
	});

	function featureDetects() {
		var M = Modernizr || {},
			tests = {
				cssanimations: M.cssanimations === undefined ? cssAnimTest() : M.cssanimations
			};
		return tests;
	}

	function cssAnimTest() {
		var animation = false,
		    animationstring = 'animation',
		    keyframeprefix = '',
		    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
		    pfx  = '';

		if( elm.style.animationName !== undefined ) { animation = true; }

		if( animation === false ) {
		  for( var i = 0; i < domPrefixes.length; i++ ) {
		    if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
		      pfx = domPrefixes[ i ];
		      animationstring = pfx + 'Animation';
		      keyframeprefix = '-' + pfx.toLowerCase() + '-';
		      animation = true;
		      break;
		    }
		  }
		}
		return animation;
	}

	return Basic;
});