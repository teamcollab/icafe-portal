/** @jsx React.DOM */
'use strict';
var React = window.React = require('react');
var reactNestedRouter = require('react-router');

var Route = reactNestedRouter.Route;
var Link = reactNestedRouter.Link;

var index = require('./pages/index');
var profile = require('./pages/profile');
var main = require('./pages/main');
var login = require('./pages/login');


module.exports = (
  <Route handler={main}>
    <Route name='login' path='/login' handler={login} />
    <Route name='profile' path='/profile' handler={profile} />
    <Route name='index' path='/' handler={index} />
  </Route>
);
