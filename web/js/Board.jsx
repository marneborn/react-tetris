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

Board.propTypes = {
  initialPosition: PropTypes.object.isRequired,
  height         : PropTypes.number.isRequired,
  width          : PropTypes.number.isRequired,
  cssClass       : PropTypes.string.isRequired
};
