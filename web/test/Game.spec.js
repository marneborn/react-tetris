'use strict';

const Game = require('../js/Game');
const Promise = require('bluebird');
const React = require('react');
const ReactTestUtils = require('react-dom/test-utils');
const ReactShallowRenderer = require('react-test-renderer/shallow');
const sinon = require('sinon');

describe('#Game', function() {
  let game;

  beforeEach('create game object', function() {
    const shallow = new ReactShallowRenderer();
    shallow.render(React.createElement(Game, null));
    game = shallow.getMountedInstance();
  });

  describe('initialization', function() {
    it('should have a score of 0', function() {
      expect(game.state.score.points).to.equal(0);
    });
    it('should have a level of 1', function() {
      expect(game.state.score.level).to.equal(1);
    });
    it('should have no complete rows', function() {
      expect(game.state.score.rows).to.equal(0);
    });
  });

  describe('.completedRows', function() {

    it('should throw an error for rows < 1', function() {
      expect(() => game.completedRows(0)).to.throw();
    });

    it('should throw an error for rows > 4', function() {
      expect(() => game.completedRows(5)).to.throw();
    });

    it('should increase the number of completed rows', function() {
      game.state.score.rows = 4;
      game.completedRows(2);
      expect(game.state.score.rows).to.equal(6);
    });

    it('should increase by level * 40 for 1 row on level 1', function() {
      game.completedRows(1);
      expect(game.state.score.points).to.equal(40);
    });

    it('should increase by level * 100 for 2 rows on level 1', function() {
      game.completedRows(2);
      expect(game.state.score.points).to.equal(100);
    });

    it('should increase by level * 300 for 3 rows on level 1', function() {
      game.completedRows(3);
      expect(game.state.score.points).to.equal(300);
    });

    it('should increase by level * 1200 for 4 rows on level 1', function() {
      game.completedRows(4);
      expect(game.state.score.points).to.equal(1200);
    });

    it('should increase by level * 100 for 2 row on level 2', function() {
      game.state.score.level = 2;
      game.completedRows(2);
      expect(game.state.score.points).to.equal(200);
    });

    it('should increase the level when going from 9 to 10 rows', function() {
      game.state.score.rows = 9;
      game.completedRows(1);
      expect(game.state.score.level).to.equal(2);
    });

    it('should not increase the level when going from 8 to 9 rows', function() {
      game.state.score.rows = 8;
      game.completedRows(1);
      expect(game.state.score.level).to.equal(1);
    });

    it('should max level out at 10', function() {
      game.state.score.rows = 99;
      game.completedRows(1);
      expect(game.state.score.level).to.equal(10);
    });

  });

});
