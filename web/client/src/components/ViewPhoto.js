import React from 'react'

export default ({photo}) => {
  var {userId, id} = photo
  var url = '/view/' + encodeURIComponent(userId) + '/' + id + '.jpg'

  return (
    <div className='view-page'>
      <img role='presentation' src={url} width='100%' />
    </div>
  )
}
