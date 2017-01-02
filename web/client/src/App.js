import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid } from 'react-bootstrap'
import Navigation from './containers/Navigation'

export default ({children}) => {
  return (
    <Grid>
      <Navigation />
      <div>
        {children}
      </div>
    </Grid>
  )
}
