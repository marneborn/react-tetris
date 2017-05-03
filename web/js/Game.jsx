'use strict';

const React = require('react');

const ScoreBoard = require('./ScoreBoard');

class Game extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className="game">
        <ScoreBoard />
      </div>
    );
  }
}

module.exports = Game;
