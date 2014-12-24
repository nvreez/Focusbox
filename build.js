({
    baseUrl: 'src/js/',
    mainConfigFile: 'src/js/main.js',

    out: 'dist/focusbox.min.js',
    optimize: 'none',

    include: ['main'],
    exclude: ['jquery'],
    name: '../../bower_components/almond/almond',
    onModuleBundleComplete: function (data) {
		var fs = module.require('fs'),
			amdclean = module.require('amdclean'),
			outputFile = data.path,
			cleanedCode = amdclean.clean({
				'filePath': outputFile
			});

		fs.writeFileSync(outputFile, cleanedCode);
	}
})