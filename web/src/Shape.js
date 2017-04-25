'use strict';

const CELLS = Symbol('cells');

class Shape {

  constructor(opts = {}) {

    if (!opts.shape) {
      this[CELLS] = [[]];
    } else {
      this.fromString(opts.shape);
    }
  }

  toJSON() {
    return this[CELLS]
          .map(row => row
               .map(b => b ? 'X' : '.')
               .join('')
              )
          .join('\n');
  }

  fromString(rows) {
    this[CELLS] = rows.map(stringToRow);
  }
}

function stringToRow(string) {
  const chars = string.split('');
  return chars.map(c => c !== '.');
}

export { Shape }
