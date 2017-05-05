'use strict';

const React = require('react');
const DEFAULT_COLOR = 'black';

class Square extends React.Component {
  styleColor() {
    return {
      background: this.props && this.props.color || DEFAULT_COLOR
    };
  }

  render() {
    return (
      <div className="square" style={this.styleColor()}></div>
    );
  }
}

module.exports = Square;
