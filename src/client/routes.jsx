/** @jsx React.DOM */
'use strict';
var React = window.React = require('react');
var reactNestedRouter = require('react-router');

var Route = reactNestedRouter.Route;
var Link = reactNestedRouter.Link;

var IndexPage = require('./pages/index');
var NullPage = require('./pages/null');
var MainPage = require('./pages/main');
var LoginPage = require('./pages/login');


module.exports = (
  <Route handler={MainPage}>
    <Route name='login' path='/login' handler={LoginPage} />
    <Route name='index' path='/' handler={IndexPage} />
    <Route name='null-page' path='/null' handler={NullPage} />
  </Route>
);
