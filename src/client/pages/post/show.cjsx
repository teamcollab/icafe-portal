
React = require('react');
restHelper = require('../../components/restHelper');

Router = require('react-router');
Link = Router.Link;
State = Router.State;

module.exports = React.createClass({
  mixins: [State]

  getInitialState: () ->
    id = this.getParams().postId

    that = this

    restHelper.get "/post/"+id+"?format=md", (res) ->
      post = res.body
      that.setState({post: post})

    state =
      post:
        content: "loading"
        id: ""

    return state

  render: ->
    post = this.state.post
    editBtn = (
      <Link to='postEdit' params={{postId: post.id}} className="btn btn-default" role="button">
        edit
      </Link>
    )

    return (

      <div>
        {editBtn if isLogin}
        <div dangerouslySetInnerHTML={{
          __html: post.content
        }} />

      </div>

    );

})
