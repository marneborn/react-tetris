'use strict';

const React = require('react');

const Board = require('./Board');
const ScoreBoard = require('./ScoreBoard');
const Shape = require('./Shape');

const SHAPES = require('./standardShapes');

const PREVIEW_BOARD = {
  WIDTH : 6,
  HEIGHT: 6
};

const PLAYING_BOARD = {
  WIDTH : 10,
  HEIGHT: 25
};

class Game extends React.Component {

  constructor(...args) {
    super(...args);
    this.shapeIdx = 0;
    this.state = {
      completedRows: 0,
      preview: {
        shape   : null,
        initialPosition: { x: 1, y: 1}
      }
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.shapeIdx++;
      if (this.shapeIdx === SHAPES.length) {
        this.shapeIdx = 0;
      }
      this.setState({
        preview: {
          shape: new Shape(SHAPES[this.shapeIdx])
        }
      });
    }, 500);
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="game">
        <ScoreBoard completedRows={this.state.completedRows}/>
        <Board width={PREVIEW_BOARD.WIDTH} height={PREVIEW_BOARD.HEIGHT} shape={this.state.preview.shape} initialPosition={this.state.preview.initialPosition}/>
      </div>
    );
  }
}

module.exports = Game;
