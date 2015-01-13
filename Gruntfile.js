module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
        	options: {
        		livereload: true
        	},
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['requirejs']
            },
            style: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass']
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

                    findNestedDependencies: true,
                    optimize: 'uglify2',

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
                                end: '\n})(jQuery, window, document);'
                            }
                        }));
                    }
                }
            }
        },
        sass: {
            options: {
                sourceMap: true,
                precision: 10,
                outputStyle: 'compressed' // compressed||nested
            },
            dist: {
                files: {
                    'dist/focusbox.min.css': 'src/sass/focusbox.scss'
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs', 'sass', 'watch']);
};