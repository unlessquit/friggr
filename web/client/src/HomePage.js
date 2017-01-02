import React from 'react'
import { Grid } from 'react-bootstrap'
import Navigation from './containers/Navigation'
import Status from './containers/Status'

export default () => {
  return (
    <Grid>
      <Navigation />
      <Status />
    </Grid>
  )
}
