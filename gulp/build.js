'use strict';

const $ = require('gulp-load-plugins')();
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const dev = true;

const vendors = ['react', 'react-dom']; //, 'redux', 'react-redux'];

module.exports = (gulp) => {

  gulp.task('build:vendor', () => {
    const b = browserify({
      debug: true
    });

    // require all libs specified in vendors array
    vendors.forEach(lib => {
      b.require(lib);
    });

    b.bundle()
      .pipe(source('vendor.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./web/dist/'))
    ;
  });

  gulp.task('build:app', () => {
    return browserify({
      entries: 'web/src/app.jsx',
      extensions: ['.js', '.jsx'],
      debug: true
    })
      .external(vendors)
      .transform(babelify, {
        presets: ['es2015', 'react']
      })
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('web/dist'));
  });

  // This is only for tests...
  gulp.task('build:jsx', () => {
    return gulp
      .src('web/src/**/*.jsx')
      .pipe($.plumber())
      .pipe($.if(dev, $.sourcemaps.init()))
      .pipe($.babel({
        presets: ['react']
      }))
      .pipe($.if(dev, $.sourcemaps.write('.')))
      .pipe(gulp.dest('web/src'));
  });

};
