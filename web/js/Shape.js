'use strict';

const CELLS = Symbol('cells');
const COLOR = Symbol('color');
// FIXME: Symbols for HEIGHT and WIDTH

const DEFAULT_COLOR = 'pink';

class Shape {

  constructor(opts = {}) {

    if (!opts.shape) {
      this[CELLS] = [[]];
    } else {
      this.fromString(opts.shape);
    }

    this[COLOR] = opts.color || DEFAULT_COLOR;
  }

  get color() {
    return this[COLOR];
  }

  get _height() {
    return this[CELLS].length;
  }

  get _width() {
    return this._height > 0 ? this[CELLS][0].length : 0;
  }

  rotateRight() {
    const H = this._height;
    const W = this._width;
    let tmp = [];
    let i, j;
    for (i = 0; i < W; i++) {
      tmp.push([]);
    }

    for (i = 0; i < H; i++) {
      for (j = 0; j < W; j++) {
        tmp[j][H - i - 1] = this[CELLS][i][j];
      }
    }
    this[CELLS] = tmp;
  }

  rotateLeft() {
    const H = this._height;
    const W = this._width;
    let tmp = [];
    let i, j;
    for (i = 0; i < W; i++) {
      tmp.push([]);
    }

    for (i = 0; i < H; i++) {
      for (j = 0; j < W; j++) {
        tmp[W - j - 1][i] = this[CELLS][i][j];
      }
    }
    this[CELLS] = tmp;
  }

  toJSON() {
    return this.toString();
  }

  toString() {
    return this[CELLS]
          .map(row => row
               .map(b => b ? 'X' : '.')
               .join('')
              )
          .join('\n');
  }

  fromString(rows) {
    let width;
    this[CELLS] = rows.map((string) => {
      const row = stringToRow(string);
      if (width === undefined) width = row.length;
      if (width !== row.length) {
        throw new Error('All rows must be the same width');
      }
      return row;
    });
  }

  // internally y=0 is the top, but from the outside worlds POV it's the bottom.
  isSet(pos) {
    if (pos.x < 0 || pos.y < 0 || pos.y >= this._height || pos.x >= this._width) {
      return false;
    }
    return this[CELLS][this[CELLS].length - pos.y - 1][pos.x];
  }

  // internally y=0 is the top, but from the outside worlds POV it's the bottom.
  getSetCells() {
    let setCells = [];
    for (let i = 0; i < this[CELLS].length; i++) {
      for (let j = 0; j < this[CELLS][i].length; j++) {
        if (this[CELLS][i][j]) {
          setCells.push({x: j, y: this[CELLS].length - i - 1});
        }
      }
    }
    return setCells;
  }
}

function stringToRow(string) {
  const chars = string.split('');
  return chars.map(c => c !== '.');
}

module.exports = Shape;
