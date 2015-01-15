
React = require('react');

Navigation = require('react-router').Navigation
restHelper = require('../../components/restHelper');
PostForm =  require('./form');
FileCreate =  require('../file/create');

module.exports = React.createClass({
  mixins: [Navigation],

  save: ->
    value = this.refs.postForm.getValue()

    self = @

    restHelper.post "/post", value, (res) ->

      return self.transitionTo('/login') if res.unauthorized

      self.transitionTo('/post/'+res.body.id);

  render: ->
    return (
      <div>
        <PostForm ref='postForm' />
        <button onClick={this.save} className='btn btn-primary' >
          submit
        </button>
        <FileCreate />
      </div>
    );

})
