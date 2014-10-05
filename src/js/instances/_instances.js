/**
 * Add instances to the define and as function arguments, and they will automatically be accessible.
 */
define([
	'instances/basic/_basic'
], function(
	instanceBasic
) {
	var arg = arguments,
		instances = {};

	return function() {
		for (var i = arg.length - 1; i >= 0; i--) {
			instances[arg[i].name] = arg[i];
		}
		return instances;
	};
});