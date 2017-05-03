'use strict';

const React = require('react');

class ScoreBoard extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      score: 0,
      level: 0
    };
  }

  render() {
    let score = this.state.score;
    let level = this.state.level;
    return (
      <div className="score-board">
        <span>Level: {level}</span>
        <span>Score: {score}</span>
      </div>
    );
  }
}

module.exports = ScoreBoard;
