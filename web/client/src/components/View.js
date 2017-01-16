import React from 'react'

export default ({photos}) => {
  var {userId, id} = photos[0]
  var url = '/view/' + encodeURIComponent(userId) + '/' + id + '.jpg'

  return (
    <div className='view-page'>
      <img role='presentation' src={url} width='100%' />
    </div>
  )
}
