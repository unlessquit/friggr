import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

function mapStateToProps (state) {
  return {
    lastUserId: state.lastUserId
  }
}

const Navigation = ({lastUserId}) => {
  const viewUrl = '/view/' + encodeURIComponent(lastUserId)

  var view = lastUserId ? <span>/ <Link to={viewUrl}>View</Link></span> : ''

  return (
    <p>
      <Link to='/'>Home</Link> / <Link to='/inbox'>Inbox</Link> {view}
    </p>
  )
}

export default connect(mapStateToProps)(Navigation)
