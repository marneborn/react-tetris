'use strict';

const gulp = require('gulp');
const globule = require('globule');

globule
  .find('gulp/**/tasks-*.js', { srcBase: __dirname, prefixBase: true })
  .forEach(file => {
    require(file)(gulp)
  });
