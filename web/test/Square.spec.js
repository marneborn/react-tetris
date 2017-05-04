'use strict';

const React = require('react');
const ReactTestUtils = require('react-dom/test-utils');
const sinon = require('sinon');

const Square = require('../js/Square');

describe('#Square', function() {
  describe('initialization', function() {

    let square;
    beforeEach('create game object', function() {
      square = ReactTestUtils.renderIntoDocument(
        React.createElement(Square, null)
      );
    });

    it('should initialize to unlocked', function() {
      expect(square.state.locked).to.equal(false);
    });
    it('should initialize to the default color', function() {
      expect(square.state.color).to.equal(null);
    });
  });

  describe('.color', function() {
    let square;
    beforeEach('create game object', function() {
      square = ReactTestUtils.renderIntoDocument(
        React.createElement(Square, {color: 'blue'})
      );
    });
    it('should initialize to the default color', function() {
      expect(square.color).to.equal(null);
    });

  });
});
