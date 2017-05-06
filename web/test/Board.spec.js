'use strict';

const Promise = require('bluebird');
const React = require('react');
const ReactShallowRenderer = require('react-test-renderer/shallow');
const sinon = require('sinon');

const Board = require('../js/Board');

describe('#Board', function() {

  describe('creation', function() {

    beforeEach('spy on console.error for propTypes', () => {
      sinon.stub(console, 'error');
    });
    afterEach(function() {
      console.error.restore();
    });
    function showError() {
      if (!console.error.called) return;
      console.log('-E- ' + console.log.firstCall.args[0]);
    }

    it('should create in the basic case', function() {
      const shallow = new ReactShallowRenderer();
      shallow.render(React.createElement(Board, {
        initialPosition: {x: 1, y: 1},
        height         : 1,
        width          : 1,
        cssClass       : 'foo'
      }));
      showError();
      expect(console.error.called).to.equal(false);
    });

    it('should fail to create if no initial position property given', function() {
      expect(() => {
        const shallow = new ReactShallowRenderer();
        shallow.render(React.createElement(Board, {
          height  : 1,
          width   : 1,
          cssClass: 'foo'
        }));
      }).to.throw();
    });

    it('should fail to create if no height property given', function() {
      const shallow = new ReactShallowRenderer();
      shallow.render(React.createElement(Board, {
        initialPosition: {x: 1, y: 1},
        width          : 1,
        cssClass       : 'foo'
      }));
      expect(console.error.called).to.equal(true);
    });

    it('should fail to create if no width property given', function() {
      const shallow = new ReactShallowRenderer();
      shallow.render(React.createElement(Board, {
        initialPosition: {x: 1, y: 1},
        height         : 1,
        cssClass       : 'foo'
      }));
      expect(console.error.called).to.equal(true);
    });
  });
});
