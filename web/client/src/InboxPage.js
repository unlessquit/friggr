import React from 'react'
import { Grid } from 'react-bootstrap'
import Navigation from './containers/Navigation'
import UploadForm from './containers/UploadForm'

export default () => {
  return (
    <Grid>
      <Navigation />
      <UploadForm />
    </Grid>
  )
}
