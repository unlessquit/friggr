import React from 'react'

export default ({params: {userId}}) => {
  var url = '/view/' + encodeURIComponent(userId) + '/latest.jpg'

  return (
    <div className='view-page'>
      <img role='presentation' src={url} width='100%' />
    </div>
  )
}
