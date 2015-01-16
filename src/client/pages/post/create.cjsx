
React = require('react');

Navigation = require('react-router').Navigation
restHelper = require('../../components/restHelper');
PostForm =  require('./form');
FileCreate =  require('../file/create');
FileList = require('../file/list');

module.exports = React.createClass({
  mixins: [Navigation]

  getInitialState: ->

    return {
      post:
        imagesrc: "~~~"
    }

  save: ->
    value = this.refs.postForm.getValue()

    self = @

    restHelper.post "/post", value, (res) ->

      return self.transitionTo('/login') if res.unauthorized

      self.transitionTo('/post/'+res.body.id);

  setImagesrc: (selectFile) ->

    value = this.refs.postForm.getValue()

    this.setState({
      post: {
        imagesrc: selectFile
        description: value.description
        title: value.title
        content: value.content
      }
    })



  loadFileList: ()->
    this.refs.fileList.load()


  render: ->
    return (
      <div>
        <PostForm ref='postForm' value={this.state.post} />
        <button onClick={this.save} className='btn btn-primary' >
          submit
        </button>
        <FileCreate afterCreate={this.loadFileList.bind(this)} />
        <FileList ref="fileList" fileSelect={this.setImagesrc.bind(this)} />

      </div>
    );

})
