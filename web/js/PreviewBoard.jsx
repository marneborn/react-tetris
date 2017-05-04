'use strict';

const React = require('react');

const BoardRow = require('./BoardRow');
const Square = require('./Square');

class PreviewBoard extends React.Component {

  constructor(...args) {
    super(...args);
    let squares = [];
    for (let i = 0; i < this.props.height; i++) {
      squares[i] = [];
      for (let j = 0; j < this.props.width; j++) {
        squares[i][j] = new Square();
      }
    }
  }

  drawShape() {
    this.props.shape.foo();
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.props.height; i++) {
      rows.push(<BoardRow width={this.props.width} />);
    }

    return (
      <div className="preview-board board">
        {rows}
      </div>
    );
  }
}

module.exports = PreviewBoard;
