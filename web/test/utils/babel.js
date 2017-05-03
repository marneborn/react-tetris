'use strict';

// --compilers jsx:babel-core/register compiles js files as well as jsx
// --require babel-register doesn't allow options (eg extensions) to be specified
// So we're left with this...
// Only do the jsx/react translation, not es2015.
// Tests are run in node, so don't need to transpile.
require("babel-register")({
  presets: ['react'],
  extensions: ['.jsx']
});
