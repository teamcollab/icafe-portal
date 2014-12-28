/** @jsx React.DOM */
'use strict';
var React = require('react');
var Counter = require('../components/counter');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!isLogin) {
        transition.redirect('/login');
      }
    }
  }
};

module.exports = React.createClass({
  mixins: [ Authentication ],
  render: function() {
    return (
      <div>
        <h2>Index - Super Counter</h2>
        <Counter />
      </div>
    );
  }
})
