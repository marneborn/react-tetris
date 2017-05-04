'use strict';

const React = require('react');

const BoardRow = require('./BoardRow');

class PlayingBoard extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.props.height; i++) {
      rows.push(<BoardRow width={this.props.width} />);
    }

    return (
      <div className="playing-board board">
        {rows}
      </div>
    );
  }
}

module.exports = PlayingBoard;
