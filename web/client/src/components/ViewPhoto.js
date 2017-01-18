import React from 'react'

export default ({photo}) => {
  var {userId, id} = photo
  var url = '/view/' + encodeURIComponent(userId) +
      '/' + encodeURIComponent(id) + '.jpg'

  return (
    <div className='view-page'>
      <img className='photo' role='presentation' src={url} />
    </div>
  )
}
