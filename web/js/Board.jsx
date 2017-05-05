'use strict';

const React = require('react');

const Square = require('./Square');

const SQUARES = Symbol('squares');

const BACKGROUND_COLOR = 'black';

class PreviewBoard extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      shapePosition: {
        x: this.props.initialPosition.x,
        y: this.props.initialPosition.y
      },
      colors: []
    };
  }

  pickCellColor(x, y) {
    if (this.state.colors[y] && this.state.colors[y][x]) {
      return this.state.colors[y][x];
    }

    if (this.props.shape.isSet({
      x: x - this.state.shapePosition.x,
      y: y - this.state.shapePosition.y
    })) {
      return this.props.shape.color;
    }

    return BACKGROUND_COLOR;
  }

  render() {
    let rows = [];
    for (let i = this.props.height - 1; i >= 0; i--) {
      let row = [];
      for (let j = 0; j < this.props.width; j++) {
        row.push(<Square color={this.pickCellColor(j, i)} />);
      }
      rows.push(<div className="board-row">{row}</div>);
    }
    return (
      <div className="preview-board board">
        {rows}
      </div>
    );
  }
}

module.exports = PreviewBoard;

function createSquares(width, height) {
  let squares = [];
  for (let i = 0; i < height; i++) {
    squares[i] = [];
    for (let j = 0; j < width; j++) {
      squares[i][j] = new Square({color: BACKGROUND_COLOR});
    }
  }
  return squares;
}
