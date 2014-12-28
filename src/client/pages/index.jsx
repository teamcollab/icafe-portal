/** @jsx React.DOM */
'use strict';
var React = require('react');
var carouselSets = require('../components/carouselSets');

module.exports = React.createClass({

  render: function() {
    // console.log("carousel", carousel);
    return (
      <div>
        <h2>Index</h2>
        <div className="row" width={1000}>
          <carouselSets />
        </div>
      </div>
    );
  }
})
