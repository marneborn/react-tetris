'use strict';

const Promise = require('bluebird');
const React = require('react');
const ReactShallowRenderer = require('react-test-renderer/shallow');
const sinon = require('sinon');

const Board = require('../js/Board');
const Shape = require('../js/Shape');
const SHAPES = require('../js/standardShapes');

describe('#Board', function() {

  let renderer;
  beforeEach('Create a new shallow renderer', function() {
    renderer = new ReactShallowRenderer();
  });

  describe('creation', function() {

    beforeEach('spy on console.error for propTypes', () => {
      sinon.stub(console, 'error');
    });
    afterEach(function() {
      console.error.restore();
    });
    function showError() {
      if (!console.error.called) return;
      console.log('-E- ' + console.log.firstCall.args[0]);
    }

    it('should create in the basic case', function() {
      renderer.render(React.createElement(Board, {
        initialPosition: {x: 1, y: 1},
        height         : 1,
        width          : 1,
        cssClass       : 'foo'
      }));
      showError();
      expect(console.error.called).to.equal(false);
    });

    it('should fail to create if no initial position property given', function() {
      expect(() => {
        renderer.render(React.createElement(Board, {
          height  : 1,
          width   : 1,
          cssClass: 'foo'
        }));
      }).to.throw();
    });

    it('should fail to create if no height property given', function() {
      renderer.render(React.createElement(Board, {
        initialPosition: {x: 1, y: 1},
        width          : 1,
        cssClass       : 'foo'
      }));
      expect(console.error.called).to.equal(true);
    });

    it('should fail to create if no width property given', function() {
      renderer.render(React.createElement(Board, {
        initialPosition: {x: 1, y: 1},
        height         : 1,
        cssClass       : 'foo'
      }));
      expect(console.error.called).to.equal(true);
    });
  });

  describe('.moveShape', function() {

    it('can shift down the shape if it\'s not at the bottom', function() {
      renderer.render(React.createElement(Board, {
        initialPosition: {x: 0, y: 0},
        height         : 6,
        width          : 6,
        shape          : new Shape({shape: ['x', '.']}),
        cssClass       : 'foo'
      }));
      let board = renderer.getMountedInstance();
      expect(board.moveShape({y: -1})).to.equal(true);
      expect(board.state.shapePosition).to.deep.equal({x: 0, y: -1});
    });

    it('can not shift down the shape if it\'s already at the bottom', function() {
      renderer.render(React.createElement(Board, {
        initialPosition: {x: 0, y: -1},
        height         : 6,
        width          : 6,
        shape          : new Shape({shape: ['x']}),
        cssClass       : 'foo'
      }));
      let board = renderer.getMountedInstance();
      expect(board.moveShape({y: -1})).to.equal(false);
      expect(board.state.shapePosition).to.deep.equal({x: 0, y: -1});
    });

    it('can not shift down the shape if there is a locked cell under any of the set cells', function() {
      renderer.render(React.createElement(Board, {
        initialPosition: {x: 0, y: 0},
        height         : 6,
        width          : 6,
        shape          : new Shape({shape: ['x']}),
        cssClass       : 'foo'
      }));
      let board = renderer.getMountedInstance();
      board.state.colors[5] = [];
      board.state.colors[5][0] = 'red';
      expect(board.moveShape({y: -1})).to.equal(false);
      expect(board.state.shapePosition).to.deep.equal({x: 0, y: 0});
    });
  });

  describe('.lockShape', function() {
    it('can shift lock the shape', function() {
      renderer.render(React.createElement(Board, {
        initialPosition: {x: 0, y: 0},
        height         : 6,
        width          : 6,
        shape          : new Shape({shape: ['x', '.'], color: 'blue'}),
        cssClass       : 'foo'
      }));
      let board = renderer.getMountedInstance();
      expect(board.state.colors[1] && board.state.colors[1][0]).to.be.undefined;
      board.lockShape();
      expect(board.state.colors[1] && board.state.colors[1][0]).to.equal('blue');
    });
  });
});
