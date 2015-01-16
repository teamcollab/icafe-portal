
React = require('react');
restHelper = require('../../components/restHelper');

module.exports = React.createClass({
  getInitialState: ->
    console.log "qq"
    this.load()

    return {
      files: []
    }

  load: ->
    console.log "loadfile ..."
    self = @
    restHelper.get "/file", (error, res) ->

      files = res.body.files
      self.setState {files: files}

  fileSelect:(file) ->
    this.props.fileSelect file



  render: ->
    self = @

    show = (file)->
      fileSelect = self.fileSelect.bind self, "/images/#{file}"


      return (
        <tr>
          <th scope="row">
            <a onClick={fileSelect} >
              {file}
            </a>
          </th>

          <td>
            ![{file}](/images/{file})
          </td>

        </tr>
      )


    return (
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>name</th>
              <th>md</th>

            </tr>
          </thead>
          <tbody>
            {this.state.files.map show}
          </tbody>
        </table>

      </div>
    );

})
