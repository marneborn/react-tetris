'use const';

module.exports = [
  {
    name: 'I',
    color: 'cyan',
    shape: [
      'X',
      'X',
      'X',
      'X'
    ]
  },
  {
    name: 'J',
    color: 'blue',
    shape: [
      'XXX',
      '..X'
    ]
  },
  {
    name: 'L',
    color: 'orange',
    shape: [
      'XXX',
      'X..'
    ]
  },
  {
    name: 'O',
    color: 'yellow',
    shape: [
      'XX',
      'XX'
    ]
  },
  {
    name: 'S',
    color: 'lime',
    shape: [
      '.XX',
      'XX.'
    ]
  },
  {
    name: 'T',
    color: 'purple',
    shape: [
      '.X.',
      'XXX'
    ]
  },
  {
    name: 'Z',
    color: 'red',
    shape: [
      'XX.',
      '.XX'
    ]
  }
].map(make4x4);

function make4x4(shape) {

  while (shape.shape.length < 4) {
    if (shape.shape.length % 2) {
      shape.shape.unshift('....');
    } else {
      shape.shape.push('....');
    }
  }

  shape.shape.forEach((row, i) => {
    while (shape.shape[i].length < 4) {
      if (shape.shape[i].length % 2) {
        shape.shape[i] = shape.shape[i] + '.';
      } else {
        shape.shape[i] = '.' + shape.shape[i];
      }
    }
  });
  return shape;
}
