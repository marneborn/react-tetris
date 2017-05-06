'use strict';

const React = require('react');
const update = require('immutability-helper');

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
  VISIBLE_HEIGHT: 20,
  CSS_CLASS: 'playing',
  SHAPE_START: {
    x: 3,
    y: 18
  }
};

class Game extends React.Component {

  constructor(...args) {
    super(...args);
    this.shapeIdx = 0;
    this.state = {
      completedRows: 0,
      preview: {
        shape: null,
        speed: 0
      },
      playing: {
        shape: new Shape(SHAPES[0]),
        speed: 0
      }
    };
  }

  componentDidMount() {
    return;
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
    this.timer && clearInterval(this.timer);
  }

  startPlaying() {
    this.setState(update(this.state, {
      playing: { speed: { $set: 500 } }
    }));
  }

  render() {
    return (
      <div className="game">
        <ScoreBoard completedRows={this.state.completedRows}/>
        <Board
           cssClass="playing"
           width={PLAYING_BOARD.WIDTH}
           height={PLAYING_BOARD.HEIGHT}
           visibleHeight={PLAYING_BOARD.VISIBLE_HEIGHT}
           shape={this.state.playing.shape}
           initialPosition={PLAYING_BOARD.SHAPE_START}
           speed={this.state.playing.speed}
           />
        <button onClick={() => this.startPlaying()}>Start</button>
      </div>
    );
  }
}

module.exports = Game;
