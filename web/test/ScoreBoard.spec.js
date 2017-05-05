'use strict';

const Promise = require('bluebird');
const React = require('react');
const ReactShallowRenderer = require('react-test-renderer/shallow');
const sinon = require('sinon');

const ScoreBoard = require('../js/ScoreBoard');

describe('#ScoreBoard', function() {
  let scoreBoard;
  let levelUpSpy;

  beforeEach('create game object', function() {
    const shallow = new ReactShallowRenderer();
    levelUpSpy = sinon.spy();
    shallow.render(React.createElement(ScoreBoard, {onLevelUp: levelUpSpy}));
    scoreBoard = shallow.getMountedInstance();
  });

  describe('initialization', function() {
    it('should have a score of 0', function() {
      expect(scoreBoard.state.points).to.equal(0);
    });
    it('should have a level of 1', function() {
      expect(scoreBoard.state.level).to.equal(1);
    });
    it('should have no complete rows', function() {
      expect(scoreBoard.state.rows).to.equal(0);
    });
  });

  describe('errors', function() {
    it('should throw an error for rows < 0', function() {
      expect(() => scoreBoard.componentWillReceiveProps({completedRows: -1})).to.throw();
    });
    it('should throw an error if rows are subtracted', function() {
      scoreBoard.state.rows = 5;
      expect(() => scoreBoard.componentWillReceiveProps({completedRows: 4})).to.throw();
    });
    it('should throw an error if more than 4 rows are added', function() {
      scoreBoard.state.rows = 5;
      expect(() => scoreBoard.componentWillReceiveProps({completedRows: 10})).to.throw();
    });
  });

  describe('state.rows', function() {
    it('should store the number of completed rows in the state.', function() {
      scoreBoard.state.rows = 70;
      scoreBoard.componentWillReceiveProps({completedRows: 71});
      expect(scoreBoard.state.rows).to.equal(71);
    });
  });

  describe('state.points', function() {

    it('should increase by level * 40 if 1 row is added', function() {
      scoreBoard.componentWillReceiveProps({completedRows: 1});
      expect(scoreBoard.state.points).to.equal(40);
    });

    it('should increase by level * 100 if 2 rows are added', function() {
      scoreBoard.componentWillReceiveProps({completedRows: 2});
      expect(scoreBoard.state.points).to.equal(100);
    });

    it('should increase by level * 300 if 3 rows are added', function() {
      scoreBoard.componentWillReceiveProps({completedRows: 3});
      expect(scoreBoard.state.points).to.equal(300);
    });

    it('should increase by level * 1200 if 4 rows are added', function() {
      scoreBoard.componentWillReceiveProps({completedRows: 4});
      expect(scoreBoard.state.points).to.equal(1200);
    });

    it('should increase the points, not set', function() {
      scoreBoard.state.points = 10;
      scoreBoard.componentWillReceiveProps({completedRows: 1});
      expect(scoreBoard.state.points).to.equal(50);
    });

    it('should be based on the increase in completed rows', function() {
      scoreBoard.state.rows = 1;
      scoreBoard.componentWillReceiveProps({completedRows: 2});
      expect(scoreBoard.state.points).to.equal(40);
    });

    it('should increase by level * 100 for 2 row on level 2', function() {
      scoreBoard.state.level = 2;
      scoreBoard.componentWillReceiveProps({completedRows: 2});
      expect(scoreBoard.state.points).to.equal(200);
    });
  });

  describe('state.level', function() {

    it('should be level 1 with 9 completed rows', function() {
      scoreBoard.state.rows = 8; // can't increase by more than 4
      scoreBoard.componentWillReceiveProps({completedRows: 9});
      expect(scoreBoard.state.level).to.equal(1);
    });

    it('should be level 2 with 10 completed rows', function() {
      scoreBoard.state.rows = 9; // can't increase by more than 4
      scoreBoard.componentWillReceiveProps({completedRows: 10});
      expect(scoreBoard.state.level).to.equal(2);
    });

    it('should max out at level 10', function() {
      scoreBoard.state.rows = 998; // can't increase by more than 4
      scoreBoard.componentWillReceiveProps({completedRows: 999});
      expect(scoreBoard.state.level).to.equal(10);
    });
  });

  describe('.levelUp', function() {
    it('should call the onLevelUp function when the level changes', function() {
      scoreBoard.state.rows = 9; // can't increase by more than 4
      scoreBoard.componentWillReceiveProps({completedRows: 10});
      expect(levelUpSpy.calledOnce).to.equal(true);
      expect(levelUpSpy.firstCall.args).to.deep.equal([2]);
    });
    it('should not call the onLevelUp function when the level does not change', function() {
      scoreBoard.state.rows = 8; // can't increase by more than 4
      scoreBoard.componentWillReceiveProps({completedRows: 9});
      expect(levelUpSpy.called).to.equal(false);
    });
  });
});
