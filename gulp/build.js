'use strict';

const $ = require('gulp-load-plugins')();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const dev = true;

module.exports = (gulp) => {

  gulp.task('build:dist:js', () => {
    return gulp
      .src('web/src/**/*.js')
      .pipe($.plumber())
      .pipe($.if(dev, $.sourcemaps.init()))
      .pipe($.babel({
        presets: ['es2015']
      }))
      .pipe($.if(dev, $.sourcemaps.write('.')))
      .pipe(gulp.dest('web/dist/js'));
  });

  gulp.task('build:jsx', () => {
    return gulp
      .pipe($.plumber())
      .pipe($.if(dev, $.sourcemaps.init()))
      .pipe($.babel({
        presets: ['es2015']
      }))
      .pipe($.if(dev, $.sourcemaps.write('.')))
      .pipe(gulp.dest('web/src'));
  });

  gulp.task('babel', () => {
    return gulp.src('web/src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('index.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('web/dist'));
  });
};
