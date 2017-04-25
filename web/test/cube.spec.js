'use strict';

import {cube} from '../src/cube.js';

describe('testing cube function', function() {
  it('should work', function() {
    expect(cube(3)).to.equal(27);
  });
});
