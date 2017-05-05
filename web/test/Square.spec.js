'use strict';

const React = require('react');
const ReactShallowRenderer = require('react-test-renderer/shallow');
const ReactTestUtils = require('react-dom/test-utils');
const sinon = require('sinon');

const Square = require('../js/Square');

describe('#Square', function() {
  const color = 'pink';
  let square;

  beforeEach(function() {
    const shallow = new ReactShallowRenderer();
    square = shallow.render(React.createElement(Square, {color: color}));
  });

  it('should create have the "square" class', function() {
    expect(square.props.className).to.equal('square');
  });

  it('should attach a style property setting the background color', function() {
    expect(square.props.style).to.deep.include({
      background: color
    });
  });

});
