window.gInit = 0;

$.yay = function() {
	this.globalInit = function() {
		window.gInit++;
	};

	var Yay = function(options) {
		console.log("woei", this, arguments);
		this.i = 0;
		this.init();
	};

	$.extend(Yay.prototype, {
		init: function() {
			this.i++;
			this.initLB();
		},
		initLB: function() {
			this.i++;
			console.log("yay");
			this.init = this.initInstance;
			this.init();
		},
		initInstance: function() {
			this.i++;
			return "instance";
		}
	});

	this.globalInit();

	this.yay = new Yay(arguments);

	// return new Yay(arguments);
};


var woei = function(options){
	console.log(":40", "yayayay");

	woei = function(options){
		console.log(":43", arguments);
	};
	woei(arguments);
};