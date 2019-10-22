module.exports = function (grunt) {
	grunt.initConfig({
		zip: {
			'./_tmp/imagesearch.zip': ['*.html', '*.js', '*.json', '_locales/*.*', '_locales/*/*.*', 'img/*.*']
		},
		zip_to_crx: {
			options: {
				privateKey: "_ssh/private-key.pem"
			},
			target: {
				src: "_tmp/imagesearch.zip", 
				dest: "dist/"
			},
		},
		watch: {
			files: ['background.js', 'content_script.js'],
			tasks: ['zip']
		}
	});
 
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-zip-to-crx');
	grunt.registerTask('default', ['zip', 'zip_to_crx', 'watch']);
};