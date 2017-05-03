'use strict';

const React = require('react');

class ScoreBoard extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className="score-board">
        <span>Level: {this.props.level}</span>
        <span>Score: {this.props.score}</span>
      </div>
    );
  }
}

module.exports = ScoreBoard;
