'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const update = require('immutability-helper');

const Square = require('./Square');

const SQUARES = Symbol('squares');

const BACKGROUND_COLOR = 'black';

class Board extends React.Component {

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

  componentDidMount() {
    this.startMoving();
  }

  componentWillUnmount() {
    this.moveTimer && clearInterval(this.moveTimer);
  }

  componentDidUpdate(prevProps) {
    if (this.props.speed !== prevProps.speed) {
      this.stopMoving();
      this.startMoving();
    }
  }

  _canMoveShape(delta = {}) {
    defaultDelta(delta);

    let shapeCells = this.props.shape.getSetCells();
    for (let i = 0; i < shapeCells.length; i++) {
      let nextY = this.state.shapePosition.y + shapeCells[i].y + delta.y;
      let nextX = this.state.shapePosition.x + shapeCells[i].x + delta.x;
      if (nextY < 0 || this.state.colors[nextY] && this.state.colors[nextY][nextX]) {
        return false;
      }
    }
    return true;
  }

  lockShape() {
    let shapeCells = this.props.shape.getSetCells();
    let colors = this.state.colors.slice();
    for (let i = 0; i < shapeCells.length; i++) {
      let setY = this.state.shapePosition.y + shapeCells[i].y;
      let setX = this.state.shapePosition.x + shapeCells[i].x;
      if (colors[setY] === undefined) {
        colors[setY] = [];
      }
      colors[setY][setX] = this.props.shape.color;
    }
    this.setState({colors: colors});
  }

  moveShape(delta = {}) {
    defaultDelta(delta);
    if (!this._canMoveShape(delta)) {
      return false;
    }

    this.setState(update(this.state, {
      shapePosition: {
        y: { $set: this.state.shapePosition.y + delta.y },
        x: { $set: this.state.shapePosition.x + delta.x }
      }
    }));
    return true;
  }

  startMoving() {
    this.stopMoving();
    if (this.props.speed === 0) return;
    this.moveTimer = setInterval(
      () => {
        if (!this.moveShape({y: -1})) {
          this.stopMoving();
          this.lockShape();
        }
      },
      this.props.speed
    );
  }

  stopMoving() {
    this.moveTimer && clearInterval(this.moveTimer);
  }

  pickCellColor(x, y) {
    if (this.state.colors[y] && this.state.colors[y][x]) {
      return this.state.colors[y][x];
    }

    if (this.props.shape && this.props.shape.isSet({
      x: x - this.state.shapePosition.x,
      y: y - this.state.shapePosition.y
    })) {
      return this.props.shape.color;
    }

    return BACKGROUND_COLOR;
  }

  showRow(y) {
    if (this.props.visibleHeight === undefined)
      return true;

    return y < this.props.visibleHeight;
  }

  render() {
    let rows = [];
    for (let i = this.props.height - 1; i >= 0; i--) {
      let row = [];
      for (let j = 0; j < this.props.width; j++) {
        row.push(<Square key={j+'x'+i} color={this.pickCellColor(j, i)} />);
      }
      rows.push(
        <div
           key={i}
           className={'row' + (!this.showRow(i) && ' hidden')}
           >
          {row}
        </div>
      );
    }
    return (
      <div className={'board ' + this.props.cssClass}>
        {rows}
      </div>
    );
  }
}

module.exports = Board;

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

function defaultDelta(delta) {
  if (delta.x === undefined) delta.x = 0;
  if (delta.y === undefined) delta.y = 0;
}

Board.propTypes = {
  initialPosition: PropTypes.object.isRequired,
  height         : PropTypes.number.isRequired,
  width          : PropTypes.number.isRequired,
  cssClass       : PropTypes.string.isRequired
};
