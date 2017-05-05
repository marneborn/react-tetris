'use strict';

const React = require('react');

const ROWS_TO_SCORE = {
  1:   40,
  2:  100,
  3:  300,
  4: 1200
};

class ScoreBoard extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      points: 0,
      level : 1,
      rows  : 0
    };
  }

  levelUp(newLevel) {
    if (this.state.level === newLevel) return;
    if (this.props.onLevelUp) {
      this.props.onLevelUp(newLevel);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.rows !== nextProps.completedRows) {
      let score = this.state.points + calculateScore(nextProps.completedRows - this.state.rows, this.state.level);
      let level = calculateLevel(nextProps.completedRows);
      let rows  = nextProps.completedRows;
      this.levelUp(level);

      this.setState({
        points: score,
        level: level,
        rows : rows
      });
    }
  }

  render() {
    return (
      <div className="score-board">
        <span>Level: {this.state.level}</span>
        <span>Score: {this.state.score}</span>
      </div>
    );
  }
}

module.exports = ScoreBoard;

function calculateScore(completedRows, level) {
  if (ROWS_TO_SCORE[completedRows] === undefined) {
    throw new Error('Out of range 1 <= completedRows <= 4: ' + completedRows);
  }
  return ROWS_TO_SCORE[completedRows] * level;
}

// Calculate the level based on the number of rows that have been cleared
// Max is 10
function calculateLevel(rows) {
  if (rows < 100) {
    return 1 + Math.floor(rows / 10);
  }
  return 10;
}
