'use strict';

const shapeHelpers = require('./utils/shape');

import {Shape} from '../src/Shape.js';

describe('#Shape', function() {

  describe('constructor and toString', function() {

    it('Should be able to create a shape', function() {
      const shape = new Shape();
      expect(JSON.stringify(shape)).to.equal('""');
    });

    it('Should be able to create a shape', function() {
      const shape = new Shape({
        shape: [
          'XX',
          'X.'
        ]
      });
      expect(JSON.stringify(shape)).to.equal(shapeHelpers.arrayToString([
        'XX',
        'X.'
      ]));
    });

  });

//   describe('constructor', function() {
//     it('should create an
//   });

//   let shape;
//   beforeEach('Create a new shape for each test', function() {
//     shape = new Shape();
//   });

})
