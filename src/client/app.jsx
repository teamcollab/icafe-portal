/** @jsx React.DOM */
'use strict';
var React = window.React = require('react');
var reactNestedRouter = require('react-router');
var Routes = reactNestedRouter.Routes;
var Route = reactNestedRouter.Route;
var Link = reactNestedRouter.Link;

var IndexPage = require('./pages/index');
var NullPage = require('./pages/null');
var MainPage = require('./pages/main');

var appRoute =
  <Routes>
    <Route handler={MainPage} >
      <Route name='index' path='/' handler={IndexPage} />
      <Route name='null-page' path='/null' handler={NullPage} />
    </Route>
  </Routes>


var container = document.getElementById('page-container');
React.renderComponent(appRoute, container);
