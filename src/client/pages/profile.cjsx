
'use strict';
React = require('react');

Authentication = {
  statics: {
    willTransitionTo: (transition) ->
      transition.redirect('/login') unless isLogin
  }
};

module.exports = React.createClass({
  mixins: [ Authentication ],
  render: ->
    return (
      <div>
        <h2>Index</h2>
      </div>
    );

})
