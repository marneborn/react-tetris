'use strict';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const win = dom.window;

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.window = dom.window;
global.document = dom.window.document;

// Propogate all properties of the window to global so that they are available.
// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
for (let key in global.window) {
  if (!global.window.hasOwnProperty(key)) continue;
  if (key in global) continue;

  global[key] = window[key];
}
