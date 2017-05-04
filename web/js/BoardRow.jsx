'use strict';

const React = require('react');
const Square = require('./Square');

class BoardRow extends React.Component {

  render() {
    let squares = [];
    for (let i = 0; i < this.props.width; i++) {
      squares.push(<Square />);
    }
    return (
      <div className="board-row">
        {squares}
      </div>
    );
  }
}

module.exports = BoardRow;
