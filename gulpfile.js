var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var Karma = require('karma').Server;
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');

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

gulp.task('sass:dev', function() {
	gulp.src('./app/sass/**/*.scss')
	.pipe(maps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCss())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('build/'));
});

gulp.task('sass:watch', function() {
	gulp.watch('./app/sass/**/*.scss', ['sass:dev']);
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

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sass:dev']);

gulp.task('test', ['lint', 'servertests', 'karmatests']);
