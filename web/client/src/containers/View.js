import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../components/View'
import { Grid } from 'react-bootstrap'
import Navigation from '../containers/Navigation'

function mapStateToProps (state) {
  return {
    photos: state.view.photos
  }
}

class ViewContainer extends Component {
  render () {
    var {photos} = this.props

    if (photos && photos.length > 0) {
      return <View photos={photos} />
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
