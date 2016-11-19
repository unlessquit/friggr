import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid } from 'react-bootstrap'
import Navigation from './containers/Navigation'

export default ({children}) => {
  return (
    <div>
      <Grid>
        <h1>Welcome to Friggr</h1>
        <Navigation />
        <div>
          {children}
        </div>
      </Grid>
    </div>
  )
}
