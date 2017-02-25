import React, { Component } from 'react'
import { connect } from 'react-redux'

import { uploadingPhoto } from '../actions'

function mapStateToProps (state) {
  return {
    lastUserId: state.lastUserId
  }
}

class Inbox extends Component {
  constructor ({dispatch, lastUserId}) {
    super()
    this.state = {
      userId: lastUserId,
      caption: ''
    }

    this.onUserIdChange = (event) => this.setState({
      userId: event.target.value
    })

    this.onCaptionChange = (event) => this.setState({
      caption: event.target.value
    })

    this.onSubmit = () => {
      dispatch(uploadingPhoto(this.state.userId))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.lastUserId) return

    if (nextProps.lastUserId && !this.state.userId) {
      this.setState({userId: nextProps.lastUserId})
      return
    }

    return
  }

  render () {
    return (
      <form action='/inbox' method='POST' encType='multipart/form-data'
        onSubmit={this.onSubmit}>
        <label htmlFor='userId'>User</label>
        <input type='text' id='userId' name='userId'
          value={this.state.userId}
          onChange={this.onUserIdChange} />
        <br />
        <label htmlFor='caption'>Caption</label>
        <input type='text' id='caption' name='caption'
          value={this.state.caption}
          onChange={this.onCaptionChange} />
        <br />
        <label htmlFor='photoFile'>Photo</label>
        <input type='file' id='photo' name='photoFile' accept='image/jpeg' />
        <br />
        <input type='submit' value='Upload' />
      </form>
    )
  }
}

export default connect(mapStateToProps)(Inbox)
