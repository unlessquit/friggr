import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps (state) {
  return {
    message: state.status.message
  }
}

const Status = ({message}) => {
  return (<span>{message}</span>)
}

export default connect(mapStateToProps)(Status)
