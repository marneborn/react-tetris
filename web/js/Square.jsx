'use strict';

const React = require('react');
const DEFAULT_COLOR = 'black';

class Square extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      locked: false,
      color: this.props && this.props.color || null
    };
  }

  static get defaultProps() {
    return {
      color: null
    };
  }

  get color() {
    return this.state.color;
  }

  set color(color) {
    this.setState({color: color});
  }

  get isLocked() {
    return this.state.locked;
  }
  lock() {
    this.setState({locked: true});
  }
  unlock() {
    this.setState({locked:false});
  }

  render() {
    return (
      <div className="square {this.state.color || DEFAULT_COLOR}" ></div>
    );
  }
}

module.exports = Square;
