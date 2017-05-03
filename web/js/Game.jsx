'use strict';

const React = require('react');
const Shape = require('./Shape');

const ScoreBoard = require('./ScoreBoard');

const ROWS_TO_SCORE = {
  1:   40,
  2:  100,
  3:  300,
  4: 1200
};

class Game extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      rows : 0,
      score: 0,
      level: 1
    };
  }

  completedRows(numberOfRows) {
    let score = calculateScore(numberOfRows, this.state.level);
    let rows  = this.state.rows + numberOfRows;
    let level = calculateLevel(rows);
    this.setState({
      score: score,
      level: level,
      rows : rows
    });
  }

  render() {
    return (
      <div className="game">
        <ScoreBoard score={this.state.score} level={this.state.level}/>
      </div>
    );
  }
}

module.exports = Game;

function calculateScore(numberOfRows, level) {
  if (ROWS_TO_SCORE[numberOfRows] === undefined) {
    throw new Error('Out of range 1 <= numberOfRows <= 4: ' + numberOfRows);
  }
  return ROWS_TO_SCORE[numberOfRows] * level;
}

// Calculate the level based on the number of rows that have been cleared
// Max is 10
function calculateLevel(totalRows) {
  if (totalRows < 100) {
    return 1 + Math.floor(totalRows / 10);
  }
  return 10;
}
