'use strict';

function cube(a) {
  return a * a * a;
};

function error() {
    throw new Error("Ha");
}

export { cube, error }
