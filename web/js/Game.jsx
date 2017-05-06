'use strict';

const React = require('react');

const Board = require('./Board');
const ScoreBoard = require('./ScoreBoard');
const Shape = require('./Shape');

const SHAPES = require('./standardShapes');

const PREVIEW_BOARD = {
  WIDTH : 6,
  HEIGHT: 6,
  CSS_CLASS: 'preview',
  SHAPE_START: {
    x: 1,
    y: 1
  }
};

const PLAYING_BOARD = {
  WIDTH : 10,
  HEIGHT: 25,
  CSS_CLASS: 'playing',
  SHAPE_START: {
    x: 1,
    y: 1
  }
};

class Game extends React.Component {

  constructor(...args) {
    super(...args);
    this.shapeIdx = 0;
    this.state = {
      completedRows: 0,
      preview: {
        shape   : null
      },
      playing: {
        shape: null
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
    }, 3000);
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="game">
        <ScoreBoard completedRows={this.state.completedRows}/>
        <Board
           cssClass="playing"
           width={PLAYING_BOARD.WIDTH}
           height={PLAYING_BOARD.HEIGHT}
           shape={this.state.preview.shape}
           initialPosition={PLAYING_BOARD.SHAPE_START}
        />
        <Board
           cssClass="preview"
           width={PREVIEW_BOARD.WIDTH}
           height={PREVIEW_BOARD.HEIGHT}
           shape={this.state.preview.shape}
           initialPosition={PREVIEW_BOARD.SHAPE_START}
        />
      </div>
    );
  }
}

module.exports = Game;
