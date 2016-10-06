// Dependencies
var coffeelint = require('gulp-coffeelint');
var debug = require('gulp-debug');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsonlint = require('gulp-jsonlint');
var lesshint = require('gulp-lesshint');

// Files
var coffeeFiles = [
    './grammars/*.cson',
    './keymaps/*.cson',
    './lib/**/*.coffee',
    './menus/*.cson',
    './snippets/*.cson'
];

var jsFiles = [
    './lib/**/*.js',
    './src/**/*.js'
];

var jsonFiles = [
    './grammars/*.json',
    './keymaps/*.json',
    './menus/*.json',
    './snippets/*.json',
    './package.json'
];

var lessFiles = [
    './styles/**/*.less'
];

// Tasks
gulp.task('lint', ['lint:coffee', 'lint:js', 'lint:json', 'lint:less']);

// Lint CoffeeScript & CSON files
gulp.task('lint:coffee', function () {
    gulp.src(coffeeFiles)
        .pipe(debug({title: 'coffeelint:'}))
        .pipe(coffeelint())
        .pipe(coffeelint.reporter('coffeelint-stylish'))
        .pipe(coffeelint.reporter('fail'));
});

// Lint LESS files
gulp.task('lint:less', function () {
     gulp.src(lessFiles)
        .pipe(debug({title: 'lesshint:'}))
        .pipe(lesshint())
        .pipe(lesshint.reporter());
});

// Lint JavaScript files
gulp.task('lint:js', function () {
  return gulp.src(jsFiles)
    .pipe(debug({title: 'jshint:'}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Lint JSON files
gulp.task('lint:json', function() {
   gulp.src(jsonFiles)
        .pipe(debug({title: 'jsonlint:'}))
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});
