import React from 'react'

export default ({params: {userId}}) => {
  var url = '/view/' + encodeURIComponent(userId) + '/latest.jpg'

  return (
    <img role='presentation' src={url} width='600' />
  )
}
