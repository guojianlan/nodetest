var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('test', function() {
	gulp.src('./assets/js/init/init.js')
		.pipe(webpack())
		.pipe(rename('init.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/init'));
});