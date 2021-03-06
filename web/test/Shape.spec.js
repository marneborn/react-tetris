'use strict';

const shapeHelpers = require('./utils/shape');
const Shape = require('../js/Shape');

describe('#Shape', function() {

  describe('constructor and toString', function() {

    it('Should be able to create a shape', function() {
      const shape = new Shape();
      expect(JSON.stringify(shape)).to.equal('""');
    });

    it('Should be able to create a simple shape', function() {

      const def = [
        'XX',
        'X.'
      ];

      const shape = new Shape({ shape: def });

      expect(JSON.stringify(shape)).to.equal(shapeHelpers.arrayToString(def));
    });

    it('Should check that all rows are the same size', function() {
      const def = [
        'XX',
        'X.XXXXX'
      ];

      expect(() => { new Shape({shape: def}); }).to.throw('All rows must be the same width');
    });

    it('Should be able to create a more complicated  shape', function() {

      const def = [
        '.XX',
        '.X.',
        '..X'
      ];

      const shape = new Shape({ shape: def });

      expect(JSON.stringify(shape)).to.equal(shapeHelpers.arrayToString(def));
    });

  });

  describe('.rotate', function() {

    const def = [
      '.XX',
      '.X.',
      '..X',
      '...',
      '...'
    ];

    let shape;
    beforeEach('Create a new shape for each test', function() {
      shape = new Shape({ shape: def });
    });

    it('Should be able to rotate right', function() {
      shape.rotateRight();
      expect(JSON.stringify(shape)).to.equal(shapeHelpers.arrayToString([
        '.....',
        '...XX',
        '..X.X'
      ]));
    });

    it('Should be able to rotate left', function() {
      shape.rotateLeft();
      expect(JSON.stringify(shape)).to.equal(shapeHelpers.arrayToString([
        'X.X..',
        'XX...',
        '.....'
      ]));
    });
  });

  describe('common shape...', function() {

    let shape;
    beforeEach('Create the shape', function() {
      const def = [
        '...',
        '.XX',
        '.X.',
        '..X'
      ];

      shape = new Shape({ shape: def });
    });

    it('should know that {x:1, y:0} is not set', function() {
      expect(shape.isSet({x: 1, y:0})).to.equal(false);
    });

    it('should know that {x:1, y:2} is set', function() {
      expect(shape.isSet({x: 1, y:2})).to.equal(true);
    });

    it('should get the x,y coordinates of set cells in the shape', function() {
      expect(shape.getSetCells()).to.deep.include.members([
        {y: 0, x: 2},
        {y: 1, x: 1},
        {y: 2, x: 1},
        {y: 2, x: 2}
      ]);
    });
  });
});
