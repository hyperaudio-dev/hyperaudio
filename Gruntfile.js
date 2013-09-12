module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// https://github.com/felixge/node-dateformat
		dateFormat: 'dS mmmm yyyy HH:MM:ss',
		stdBanner: '/*! <%= pkg.name %> v<%= pkg.version %> ~ (c) 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %> ~ Built on: <%= grunt.template.today(dateFormat) %> */\n',

		concat: {

			options: {
				// banner: '/*! <%= pkg.name %> v<%= pkg.version %> (c) 2012-<%= grunt.template.today("yyyy") %> <%= grunt.template.today(dateFormat) %> */\n',
				banner: '<%= stdBanner %>'
			},
			hyperaudio: {
				files: {
					'build/<%= pkg.name %>.js': [
						'src/wrapper/top.js',
						'node_modules/dragdrop/dragdrop.js',
						'node_modules/wordselect/wordselect.js',
						'src/hyperaudio.js',
						'src/utilities/utilities.js',
						'src/wrapper/bot.js'
					]
				}
			}
		},

		uglify: {
			options: {
				// mangle: false,
				// compress: false,

				// banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today(dateFormat) %> */\n',
				banner: '<%= stdBanner %>',
				beautify: {
					max_line_len: 0 // Generates the output on a single line
				}
			},
			hyperaudio: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js']
				}
			}
		},

		jshint: {

			before: {
				files: {
					src: [
						'Gruntfile.js',
						'src/**/*.js'
					]
				}
			},
			after: {
				files: {
					src: [
						'dist/<%= pkg.name %>.js'
					]
				}
			},

			// configure JSHint (Documented at http://www/jshint.com/docs/)
			options: {
				// Using the jshinnt defaults
/*
				// lots of other options...
				curly: true,
				eqeqeq: true,
				browser: true,
				globals: {
					jQuery: true
				}
*/
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('test', ['jshint']);
};
