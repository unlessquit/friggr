import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewPhoto from '../components/ViewPhoto'
import { Grid } from 'react-bootstrap'
import Navigation from '../containers/Navigation'
import { viewNextPhoto, viewPreviousPhoto } from '../actions'

function mapStateToProps (state) {
  return {
    photos: state.view.photos,
    current: state.view.current
  }
}

class ViewContainer extends Component {
  constructor () {
    super()
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSwipe = this.handleSwipe.bind(this)
  }

  componentWillMount () {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleSwipe (direction) {
    var {dispatch} = this.props

    switch (direction) {
      case 'right':
        dispatch(viewPreviousPhoto())
        break
      case 'left':
        dispatch(viewNextPhoto())
        break
      default:
        break
    }
  }

  handleKeyDown (event) {
    var {dispatch} = this.props

    switch (event.key) {
      case 'ArrowLeft':
        dispatch(viewPreviousPhoto())
        break
      case 'ArrowRight':
        dispatch(viewNextPhoto())
        break
      default:
        break
    }
  }

  render () {
    var {photos, current} = this.props

    if (photos && photos.length > 0) {
      return <ViewPhoto photo={photos[current]} onSwipe={this.handleSwipe} />
    }
    var message = photos ? 'No photos' : 'Loading...'

    return (
      <Grid>
        <Navigation />
        <span>{message}</span>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(ViewContainer)
