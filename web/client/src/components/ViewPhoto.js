import React, { Component } from 'react'
import ReactTouchEvents from 'react-touch-events'

function Caption (caption) {
  if (!caption) return ''

  return <div className='caption'><span>{caption}</span></div>
}

export default class ViewPhoto extends Component {
  constructor ({dispatch}) {
    super()
    this.state = {isLoading: true}
    this.onLoad = (event) => { this.setState({isLoading: false}) }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.photo.id !== nextProps.photo.id) {
      this.setState({isLoading: true})
    }
  }

  render () {
    var photo = this.props.photo
    var onSwipe = this.props.onSwipe || function () {}
    var url = viewPhotoPath(photo)

    // img key attribute forces immediate display of new photo even when
    // it's not yet loaded (giving user feedback that his action has
    // been registered).
    return (
      <ReactTouchEvents onSwipe={onSwipe}>
        <div className='view-page'>
          <img key={photo.id} className='photo' role='presentation' src={url} onLoad={this.onLoad} />
          {Caption(this.state.isLoading ? 'Loading...' : photo.caption)}
        </div>
      </ReactTouchEvents>
    )
  }
}

function viewPhotoPath (photoInfo) {
  return '/view/' + photoInfo.userId + '/' + photoInfo.id + '/2000/2000'
}
