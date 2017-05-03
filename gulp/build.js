'use strict';

const $ = require('gulp-load-plugins')();
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const dev = true;

const distDest = 'web/dist';
const vendors = ['react', 'react-dom'];

module.exports = (gulp) => {


  gulp.task('build:vendor:js', () => {
    const b = browserify({
      debug: true
    });

    // Load each library into the vendor object (no explicit requires...)
    vendors.forEach(lib => {
      b.require(lib);
    });

    b.bundle()
      .pipe(source('vendor.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(distDest))
    ;
  });

  gulp.task('build:app:js', () => {
    return browserify({
      entries: 'web/js/app.jsx',
      extensions: ['.js', '.jsx'],
      debug: true
    })
      .external(vendors)
      .transform(babelify, {
        presets: ['es2015', 'react']
      })
      .bundle()
      .on('error', (err) => {
        console.log(err.stack);
      })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(distDest));
  });

  gulp.task('build:app:css', () => {
    return gulp.src('web/css/*.css')
      .pipe(concat('app.css'))
      .pipe(gulp.dest(distDest));
  });

  gulp.task('build:all',
            [
              'build:vendor:js',
              'build:app:js',
              'build:app:css'
            ]
           );

  gulp.task('build:continuous', () => {
    gulp.watch(['web/js/**/*.*js', 'web/js/**/*.jsx'], ['build:app:js']);
    gulp.watch('web/css/**/*.css', ['build:app:css']);
    gulp.watch([module.filename, '../package.json'], ['build:vendor:js']);
  });

};
