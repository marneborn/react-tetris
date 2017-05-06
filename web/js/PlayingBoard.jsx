'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const update = require('immutability-helper');

const Board = require('./Board');

class PlayingBoard extends Board {

  componentDidMount() {
    this.props.bar();
    this.startMoving();
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    switch (event.key){
    case 'ArrowLeft':
      this.moveShape({x:-1});
      break;
    case 'ArrowRight':
      this.moveShape({x:1});
      break;
    }
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
}

module.exports = PlayingBoard;

function defaultDelta(delta) {
  if (delta.x === undefined) delta.x = 0;
  if (delta.y === undefined) delta.y = 0;
}
