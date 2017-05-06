'use strict';

const _ = require('lodash');
const babel = require('gulp-babel');
const babelify = require('babelify');
const Browserify = require('browserify');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const path = require('path');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const dev = true;

const distDest = 'web/dist';
const vendors = ['react', 'react-dom', 'immutability-helper'];

module.exports = (gulp) => {

  gulp.task('build:vendor:js', () => {
    return new Browserify({
      require: vendors,
      debug: true
    })
      .bundle()
      .on('error', onError)
      .pipe(source('vendor.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(distDest))
    ;
  });

  gulp.task('build:app:js', () => {
    return new Browserify({
      entries: 'web/js/app.jsx',
      extensions: ['.js', '.jsx'],
      debug: true
    })
      .external(vendors)
      .transform((file, opts) => {
        let presets = ['es2015'];
        if (path.extname(file) === '.jsx') {
          presets.push('react');
        }
        return babelify(file, _.extend({}, opts, { presets: presets }));
      })
      .bundle()
      .on('error', onError)
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

  gulp.task('build:app:html', () => {
    return gulp.src('web/html/**/*.html')
      .pipe(gulp.dest(distDest));
  });

  gulp.task('build:all',
            [
              'build:vendor:js',
              'build:app:js',
              'build:app:css',
              'build:app:html'
            ]
           );

  gulp.task('build:continuous', () => {
    gulp.watch(['web/js/**/*.*js', 'web/js/**/*.jsx'], ['build:app:js']);
    gulp.watch('web/css/**/*.css', ['build:app:css']);
    gulp.watch('web/html/**/*.html', ['build:app:html']);
    gulp.watch([module.filename, '../package.json'], ['build:vendor:js']);
  });

};

function onError (err) {
  console.error("-E- " + (err.stack || err.message || err));
  this.emit('end');
}
