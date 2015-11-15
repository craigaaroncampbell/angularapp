var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');


gulp.task('default', ['lint', 'jscs', 'test']);

gulp.task('lint', function(){
  gulp.src(['gulpfile.js', 'server.js', 'models/**/*.js', 'test/**/*test.js', 'lib/**/*.js', 'routes/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['lint'], function(){
  gulp.src('test/**/*test.js')
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('jscs', function(){
  gulp.src(['gulpfile.js', 'server.js', 'models/**/*.js', 'test/**/*test.js', 'lib/**/*.js', 'routes/**/*.js'])
  .pipe(jscs())
  .pipe(stylish());
});
