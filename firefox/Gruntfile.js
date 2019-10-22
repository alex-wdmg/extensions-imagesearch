module.exports = function (grunt) {
	grunt.initConfig({
		zip: {
			'./dist/imagesearch.xpi': ['*.html', '*.js', '*.json', '_locales/*.*', '_locales/*/*.*', 'img/*.*']
		},
		watch: {
			files: ['background.js', 'content_script.js'],
			tasks: ['zip']
		}
	});
 
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-zip');
	grunt.registerTask('default', ['zip', 'watch']);
};