/** @jsx React.DOM */
'use strict';
var React = window.React = require('react');
var Router = require('react-router');

var Router = require('react-router');
var LoginPage = require('./login');
var Link = Router.Link;

var RouteHandler = Router.RouteHandler;

var request = require('superagent');

var get = function (url, cb) {
  request.get(url)
  .set('Content-Type', 'application/json')
  .end(cb);
}

module.exports = React.createClass({


  render: function () {
    return (
      <div id="main">
        <div role="navigation" className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="nabar-header"><a className="navbar-brand">icafe</a></div>
            <div className="navbar-collapse collapse">
              <ul id="navbarmenu" className="nav navbar-nav navbar-right">
                <li><Link to='index'>Index</Link></li>
                <li><Link to='null-page'>Null</Link></li>
                <li><p className="navbar-text"><span className="glyphicon glyphicon-user"></span></p></li>
                <li><a href="/logout"><span className="glyphicon glyphicon-off"></span> Log Out</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div id="page-container">
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }
});
