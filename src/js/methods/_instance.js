define(['jquery'], function($) {
	return function(instanceName, options) {
    	if (this.instances[instanceName]) {
    		var args = Array.prototype.slice.call(arguments, 1);
			return new this.instances[instanceName](args);
		} else {
			$.error('Instance with instance-name "' + instanceName + '" was not found');
		}
	};
});