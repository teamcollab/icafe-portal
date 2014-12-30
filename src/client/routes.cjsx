
'use strict';
React = window.React = require('react');
reactNestedRouter = require('react-router');

Route = reactNestedRouter.Route;
Link = reactNestedRouter.Link;

index = require('./pages/index');
profile = require('./pages/profile');
main = require('./pages/main');
login = require('./pages/login');


module.exports = (
  <Route handler={main}>
    <Route name='login' path='/login' handler={login} />
    <Route name='profile' path='/profile' handler={profile} />
    <Route name='index' path='/' handler={index} />
  </Route>
);
