/** @jsx React.DOM */
'use strict';
var React = window.React = require('react');
var Router = require('react-router');
var routes = require('./routes');

var container = document.getElementById('page-container');


Router.run(routes, function (Handler) {
  React.render(<Handler/>, container);
});
