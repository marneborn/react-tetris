'use strict';

const CELLS = Symbol('cells');
const HEIGHT = Symbol('height');
const WIDTH = Symbol('width');

class Shape {

  constructor(opts = {}) {

    if (!opts.shape) {
      this[CELLS] = [[]];
    } else {
      this.fromString(opts.shape);
    }
  }

  get [HEIGHT] () {
    return this[CELLS].length;
  }

  get [WIDTH]() {
    return this[HEIGHT] > 0 ? this[CELLS][0].length : 0;
  }

  rotateRight() {
    const H = this[HEIGHT];
    const W = this[WIDTH];
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
    const H = this[HEIGHT];
    const W = this[WIDTH];
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
}

function stringToRow(string) {
  const chars = string.split('');
  return chars.map(c => c !== '.');
}

module.exports = Shape;
