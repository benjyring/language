var cheerio = require('cheerio');
module.exports = function(grunt) {
	grunt.registerMultiTask('themeIt', 'Compile theme files.', function() {
		this.files.forEach(function(file) {

			var contents = grunt.file.read(file.src),
				$ = cheerio.load(contents);

			grunt.log.write(file.src + ': ');

		// 	contents = $.html();

			grunt.file.write(file.dest, contents);
			grunt.log.writeln('compiled.');
		});
	});
};
