'use strict';

const React = require('react');

class Game extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
        There will be some game here later
        </div>
      </div>
    );
  }
}

module.exports = Game;
