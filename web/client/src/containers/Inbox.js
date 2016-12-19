import React, { Component } from 'react'
import { connect } from 'react-redux'

import { uploadingPhoto } from '../actions'

function mapStateToProps (state) {
  return {
    lastUserId: state.lastUserId
  }
}

class Inbox extends Component {
  constructor ({dispatch}) {
    super()
    this.onUserIdChange = (event) => this.setState({
      userId: event.target.value
    })
    this.onSubmit = () => {
      dispatch(uploadingPhoto(this.state.userId))
    }
  }

  render () {
    return (
      <form action='/inbox' method='POST' encType='multipart/form-data'
        onSubmit={this.onSubmit}>
        <label htmlFor='userId'>User</label>
        <input type='text' id='userId' name='userId'
          defaultValue={this.props.lastUserId}
          onChange={this.onUserIdChange} />
        <br />
        <label htmlFor='photoFile'>Photo</label>
        <input type='file' id='photo' name='photoFile' />
        <br />
        <input type='submit' value='Upload' />
      </form>
    )
  }
}

export default connect(mapStateToProps)(Inbox)
