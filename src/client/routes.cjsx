
'use strict';
React = window.React = require('react');
reactNestedRouter = require('react-router');

Route = reactNestedRouter.Route;
Link = reactNestedRouter.Link;

Index = require('./pages/index');
Profile = require('./pages/profile');
Main = require('./pages/main');
Login = require('./pages/login');
Post = require('./pages/post');


module.exports = (
  <Route handler={Main}>
    <Route name='login' path='/login' handler={Login} />
    <Route name='profile' path='/profile' handler={Profile} />
    <Route name='index' path='/' handler={Index} />
    <Route name='post' path='/post' handler={Post} />
  </Route>
);
