'use strict';

const React = require('react');
const Shape = require('./Shape');

const ScoreBoard = require('./ScoreBoard');

class Game extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      score: 0,
      level: 1
    };
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
