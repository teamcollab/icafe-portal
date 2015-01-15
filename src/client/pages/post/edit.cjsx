
React = require('react');
t = require('tcomb-form');
Navigation = require('react-router').Navigation


restHelper = require('../../components/restHelper');
Router = require('react-router');
Navigation = Router.Navigation
State = Router.State;

PostForm =  require('./form');

FileCreate =  require('../file/create');


module.exports = React.createClass({
  mixins: [Navigation, State],

  getInitialState: () ->
    id = this.getParams().postId

    that = this

    console.log "/post/"+id
    restHelper.get "/post/"+id, (res) ->
      post = res.body
      that.setState({post: post})

    state =
      post:
        content: "loading"
        id: ""

    return state

  save: ->
    id = this.getParams().postId
    value = this.refs.postForm.getValue()

    self = @

    restHelper.put "/post/"+id, value, (res) ->

      return self.transitionTo('/login') if res.unauthorized

      self.transitionTo('/post/'+id);

  delete: ->
    id = this.getParams().postId
    self = @
    restHelper.del "/post/"+id, (res) ->

      return self.transitionTo('/login') if res.unauthorized

      self.transitionTo('/');


  render: ->
    return (
      <div>
        <PostForm ref='postForm' value={this.state.post} />
        <button onClick={this.save} className='btn btn-primary' >
          save
        </button>

        <button onClick={this.delete} className='btn btn-primary' >
          delete
        </button>

        <FileCreate />


      </div>
    );

})
