'use strict';

describe('checking that mocha runs', function() {
  it('should pass', function() {
    expect(true).to.equal(true);
  });
  it('should fail', function() {
    expect(true).to.equal(false);
  });

});
