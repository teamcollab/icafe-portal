
'use strict';
React = require('react');
carouselSets = require('../components/carouselSets');
restHelper = require('../components/restHelper');
Router = require('react-router');
Link = Router.Link;



module.exports = React.createClass({
  getInitialState: () ->

    self = @
    restHelper.get "/post", (res) ->
      self.setState {posts: res.body.posts}

    return {posts: []}


  render: ->

    imgStyle = {
      width: "140px",
      height: "140px"
    }

    renderPost = (post) ->
      imagesrc = post.imagesrc || "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="

      return(
        <div className="col-lg-4">
          <img className="img-circle" src="#{imagesrc}" alt="Generic placeholder image" style={imgStyle} />

          <h2>{post.title}</h2>
          <p>{post.derscription}</p>
          <p>
            <Link to='postShow' params={{postId: post.id}} className="btn btn-default" role="button">
              View details &raquo;
            </Link>
          </p>
        </div>
      )



    return (
      <div >
        <div className="row">
          <carouselSets />
        </div>
        <div className="row">
          {this.state.posts.map(renderPost)}
        </div>
      </div>
    );

})
