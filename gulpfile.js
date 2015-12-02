var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');


gulp.task('default', ['lint', 'jscs', 'test', 'build:dev']);

gulp.task('lint', function() {
	gulp.src(['gulpfile.js', 'server.js', 'models/**/*.js', 'test/**/*test.js', 'lib/**/*.js', 'routes/**/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['lint'], function() {
	gulp.src('test/**/*test.js')
	.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('jscs', function() {
	gulp.src(['gulpfile.js', 'server.js', 'models/**/*.js', 'test/**/*test.js', 'lib/**/*.js', 'routes/**/*.js'])
	.pipe(jscs())
	.pipe(stylish());
});

gulp.task('static:dev', function() {
	gulp.src(['app/**/*.html'])
	.pipe(gulp.dest('build/'));  //copy html from app directory to build directory
});

gulp.task('webpack:dev', function() {
	gulp.src('app/js/entry.js') //entry.js is the common name, but it can be any name
	.pipe(webpack({
		output: {
			filename: 'bundle.js'
		}
	}))
	.pipe(gulp.dest('build/'));
});

gulp.task('css:dev', function() {
	gulp.src([
		'app/css/base.css',
		'app/css/layout.css',
		'app/css/module.css'
		])
	.pipe(concatCss('style.min.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('build/'))
});

gulp.task('css:watch', function() {
	gulp.watch('./app/css/**/*.css' , ['css:dev'])
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
