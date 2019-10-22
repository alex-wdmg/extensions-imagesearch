module.exports = function (grunt) {
	grunt.initConfig({
		zip: {
			'./dist/imagesearch.safariextz': ['*.*']
		},
		watch: {
			files: ['*.js', '*.html', 'content_script.js', '*.json', '*.png', '*.plist'],
			tasks: ['zip']
		}
	});
 
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-zip');
	grunt.registerTask('default', ['zip', 'watch']);
};