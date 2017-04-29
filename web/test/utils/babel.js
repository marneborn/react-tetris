'use strict';

// --compilers jsx:babel-core/register compiles js files as well as jsx
// --require babel-register doesn't allow options (eg extensions) to be specified
// So we're left with this...
require("babel-register")({
  presets: ['react'],
  extensions: ['.jsx']
});
