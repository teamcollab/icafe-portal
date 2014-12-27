/** @jsx React.DOM */
'use strict';
var React = window.React = require('react');
var reactNestedRouter = require('react-router');
var Link = reactNestedRouter.Link;

module.exports = React.createClass({
  render: function () {
    return (
      <div className='row' >
        <div className='col-md-2'>
          <h3>Links</h3>
          <ul className='nav nav-pills nav-stacked' >
            <li><Link to='index'>Index</Link></li>
            <li><Link to='null-page'>Null</Link></li>
          </ul>
        </div>
        <div className='col-md-10 well'>
          {this.props.activeRouteHandler()}
        </div>
      </div>
    );
  }
});
