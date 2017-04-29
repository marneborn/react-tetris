(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
// const Game = require('./Game');
console.log("HERE1");
// ReactDOM.render(React.createElement(Game, null), document.getElementById('game-container'));

ReactDOM.render(React.createElement('h1', null, 'Hello, world! This from react!'), document.getElementById('root'));



},{"react":"react","react-dom":"react-dom"}]},{},[1])

//# sourceMappingURL=bundle.js.map
