/**
 * Add instances to the define and as function arguments, and they will automatically be accessible.
 */
define([
	'themes/basic/basic'
], function(
	ThemeBasic
) {
	var arg = arguments,
		themes = {};

	for (var i = arg.length - 1; i >= 0; i--) {
		themes[arg[i].name] = arg[i];
	}
	return themes;
});