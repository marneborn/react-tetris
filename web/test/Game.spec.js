'use strict';

const Promise = require('bluebird');
const React = require('react');
const ReactShallowRenderer = require('react-test-renderer/shallow');
const sinon = require('sinon');

const Game = require('../js/Game');

describe('#Game', function() {
  let game;

  beforeEach('create game object', function() {
    const shallow = new ReactShallowRenderer();
    shallow.render(React.createElement(Game, null));
    game = shallow.getMountedInstance();
  });

  describe('initialization', function() {
    it('should start with 0 completedRows', function() {
      expect(game.state.completedRows).to.equal(0);
    });
    it('should start with no preview shape', function() {
      expect(game.state.preview.shape).to.equal(null);
    });
    it('should start with preview shape placed at {1,1}', function() {
      expect(game.state.preview.initialPosition).to.deep.equal({x:1, y:1});
    });
  });
});
