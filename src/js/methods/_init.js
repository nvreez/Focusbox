define(['jquery', 'instances/_instances'], function($, Instances) {
	var instances = Instances;

	// https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_animations/Detecting_CSS_animation_support
	function cssAnimTest() {
		var elm = document.createElement("div"),
			animation = false,
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

		if(animation === false) {
			return false;
		} else {
			return {
				property : animationstring,
				prefix : keyframeprefix
			};
		}
	}

	return function() {
		this.$body = $('body');
		this.cssAnimation = cssAnimTest();
		this.$overlay = $(document.createElement('div'))
			.attr('id', this.settings.prefix + this.settings.overlayId);

		this.instances = instances();

		return this;
	};
});