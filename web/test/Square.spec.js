'use strict';

const React = require('react');
const ReactShallowRenderer = require('react-test-renderer/shallow');
const sinon = require('sinon');

const Square = require('../js/Square');

describe('#Square', function() {
  describe('initialization', function() {

    let square;
    beforeEach('create game object', function() {
      const shallow = new ReactShallowRenderer();
      shallow.render(React.createElement(Square, null));
      square = shallow.getMountedInstance();
    });

    it('should initialize to unlocked', function() {
      expect(square.state.locked).to.equal(false);
    });
    it('should initialize to the default color', function() {
      expect(square.state.color).to.equal(null);
    });
  });

  describe('.color', function() {
    const color = 'blue';

    let square;
    beforeEach('create game object', function() {
      const shallow = new ReactShallowRenderer();
      shallow.render(React.createElement(Square, {color: color}));
      square = shallow.getMountedInstance();
    });

    it('should initialize to the color from the props', function() {
      expect(square.color).to.equal(color);
    });

    it('should be able to change the color', function() {
      square.color = 'red';
      expect(square.color).to.equal('red');
    });
  });

  describe('.lock*', function() {
    const color = 'blue';

    let square;
    beforeEach('create game object', function() {
      const shallow = new ReactShallowRenderer();
      shallow.render(React.createElement(Square, null));
      square = shallow.getMountedInstance();
    });

    it('should initialize to unlocked', function() {
      expect(square.isLocked).to.equal(false);
    });

    it('should be able to lock the square', function() {
      square.lock();
      expect(square.isLocked).to.equal(true);
    });

    it('should be able to unlock the square', function() {
      square.lock();
      square.unlock();
      expect(square.isLocked).to.equal(false);
    });
  });

});
