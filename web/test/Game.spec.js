'use strict';

const Game = require('../js/Game');
const Promise = require('bluebird');
const sinon = require('sinon');

describe('#Game', function() {
  let game;

  beforeEach('create game object', function() {
    game = new Game();
  });

  describe('initialization', function() {
    it('should have a score of 0', function() {
      expect(game.state.score).to.equal(0);
    });
    it('should have a level of 1', function() {
      expect(game.state.level).to.equal(1);
    });
    it('should have no complete rows', function() {
      expect(game.state.rows).to.equal(0);
    });
  });

  describe('.completedRows', function() {

    let setState;
    beforeEach('Spy on setState', function() {
      setState = sinon.stub(Game.prototype, 'setState');
    });
    afterEach('restore setState spy', function() {
      Game.prototype.setState.restore();
    });

    it('should throw an error for rows < 1', function() {
      expect(() => game.completedRows(0)).to.throw();
    });

    it('should throw an error for rows > 4', function() {
      expect(() => game.completedRows(5)).to.throw();
    });

    it('should increase by level * 40 for 1 row on level 1', function() {
      game.completedRows(1);
      expect(setState.getCall(0).args[0].score).to.equal(40);
    });

    it('should increase by level * 100 for 2 rows on level 1', function() {
      game.completedRows(2);
      expect(setState.getCall(0).args[0].score).to.equal(100);
    });

    it('should increase by level * 300 for 3 rows on level 1', function() {
      game.completedRows(3);
      expect(setState.getCall(0).args[0].score).to.equal(300);
    });

    it('should increase by level * 1200 for 4 rows on level 1', function() {
      game.completedRows(4);
      expect(setState.getCall(0).args[0].score).to.equal(1200);
    });

    it('should increase by level * 100 for 2 row on level 2', function() {
      game.state.level = 2;
      game.completedRows(2);
    });

    it('should increase the number of completed rows', function() {
      game.state.rows = 4;
      game.completedRows(2);
      expect(setState.getCall(0).args[0].rows).to.equal(6);
    });

    it('should increase the level, one per ten completed rows', function() {
      game.state.rows = 9;
      game.state.level = 1;
      game.completedRows(1);
      expect(setState.getCall(0).args[0].level).to.equal(2);
    });

    it('should not increase the level when going from 8 to 9 rows', function() {
      game.state.rows = 8;
      game.state.level = 1;
      game.completedRows(1);
      expect(setState.getCall(0).args[0].level).to.equal(1);
    });

    it('should max level out at 10', function() {
      game.state.rows = 99;
      game.state.level = 10;
      game.completedRows(1);
      expect(setState.getCall(0).args[0].level).to.equal(10);
    });

  });

});
