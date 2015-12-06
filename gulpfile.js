var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var Karma = require('karma').Server;

gulp.task('default', ['lint', 'jscs', 'test', 'build:dev']);

gulp.task('lint', function() {
	gulp.src(['gulpfile.js', 'server.js', 'models/**/*.js', 'test/**/*test.js', 'lib/**/*.js', 'routes/**/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
	gulp.src(['gulpfile.js', 'server.js', 'models/**/*.js', 'test/**/*test.js', 'lib/**/*.js', 'routes/**/*.js', 'app/**/*.js'])
	.pipe(jscs())
	.pipe(stylish());
});

gulp.task('static:dev', function() {
	gulp.src(['app/**/*.html'])
	.pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', function() {
	gulp.src('app/js/entry.js')
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
		'app/css/module.css',
		'app/css/state.css'
		])
	.pipe(concatCss('style.min.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('build/'));
});

gulp.task('css:watch', function() {
	gulp.watch('./app/css/**/*.css' , ['css:dev']);
});

gulp.task('webpack:test', function() {
	return gulp.src('./test/client/test_entry.js')
		.pipe(webpack({
			output: {
				filename: 'test_bundle.js'
			}
		}))
		.pipe(gulp.dest('test/client'));
});

gulp.task('servertests', function() {
	gulp.src('./test/api_tests/**/*test.js')
	.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('karmatests', ['webpack:test'], function(done) {
	new Karma({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);

gulp.task('test', ['lint', 'servertests', 'karmatests']);
