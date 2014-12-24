module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
        	options: {
        		livereload: true
        	}
        },
        requirejs: {
            js: {
                options: {
                    baseUrl: 'src/js/',
                    paths: {
                        jquery: '../../bower_components/jquery/dist/jquery.min',
                        text: 'plugins/text'
                    },
                    include: ['main'],
                    exclude: ['jquery', 'text'],
                    out: 'dist/focusbox.min.js',

                    optimize: 'uglify2',
                    findNestedDependencies: true,

                    onModuleBundleComplete: function (data) {
                        var fs = require('fs'),
                        amdclean = require('amdclean'),
                        outputFile = data.path;

                        fs.writeFileSync(outputFile, amdclean.clean({
                            filePath: outputFile,
                            wrap: {
                                // This string is prepended to the file
                                start: ';(function($, window, document, undefined) {\n',
                                // This string is appended to the file
                                end: '\n}(jQuery, window, document));'
                            }
                        }));
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs','watch']);
};