'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test-web-unit', () =>
	gulp.src('web/test/**/*.spec.js', {read: false})
		// `gulp-mocha` needs filepaths so you can't have any plugins before it
		.pipe(mocha({
      reporter  : 'dot',
      quiet     : false,
      noFail    : false,
      checkLeaks: true,
      require   : ['./web/test/utils/globals.js', 'babel-register']
    }))
);
