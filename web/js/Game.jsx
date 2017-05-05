'use strict';

const React = require('react');

const PlayingBoard = require('./PlayingBoard');
const PreviewBoard = require('./PreviewBoard');
const ScoreBoard = require('./ScoreBoard');
const Shape = require('./Shape');

const ROWS_TO_SCORE = {
  1:   40,
  2:  100,
  3:  300,
  4: 1200
};

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
    this.state = {
      score: {
        rows  : 0,
        points: 0,
        level : 1
      },
      preview: {
        shape   : new Shape({
          shape: ['....', '.xx.', '.x..', '....'],
          color: 'pink'
        }),
        initialPosition: { x: 1, y: 1}
      }
    };
  }

  // Invoked once before first render
  componentWillMount() {
    // Calling setState here does not cause a re-render
    //alert('In Component Will Mount');
  }

  // Invoked once after the first render
  componentDidMount() {
    // You now have access to this.getDOMNode()
    //alert('In Component Did Mount');
  }

  // Invoked whenever there is a prop change
  // Called BEFORE render
  componentWillReceiveProps(nextProps) {
    // Not called for the initial render
    // Previous props can be accessed by this.props
    // Calling setState here does not trigger an additional re-render
    //alert('In Component Will Receive Props');
  }

  // Called IMMEDIATELY before a component is unmounted
  componentWillUnmount() {
    //alert('will unmount');
  }

  completedRows(numberOfRows) {
    let score = calculateScore(numberOfRows, this.state.score.level);
    let rows  = this.state.score.rows + numberOfRows;
    let level = calculateLevel(rows);
    this.setState({
      score: {
        points: score,
        level: level,
        rows : rows
      }
    });
  }

  render() {
    return (
      <div className="game">
        <ScoreBoard score={this.state.score.points} level={this.state.score.level} />
        <PreviewBoard width={PREVIEW_BOARD.WIDTH} height={PREVIEW_BOARD.HEIGHT} shape={this.state.preview.shape} initialPosition={this.state.preview.initialPosition}/>
      </div>
    );
  }
}

module.exports = Game;

function calculateScore(numberOfRows, level) {
  if (ROWS_TO_SCORE[numberOfRows] === undefined) {
    throw new Error('Out of range 1 <= numberOfRows <= 4: ' + numberOfRows);
  }
  return ROWS_TO_SCORE[numberOfRows] * level;
}

// Calculate the level based on the number of rows that have been cleared
// Max is 10
function calculateLevel(rows) {
  if (rows < 100) {
    return 1 + Math.floor(rows / 10);
  }
  return 10;
}
