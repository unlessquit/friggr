import React from 'react'

export default ({photo}) => {
  var url = viewPhotoPath(photo)

  return (
    <div className='view-page'>
      <img className='photo' role='presentation' src={url} />
    </div>
  )
}

function viewPhotoPath (photoInfo) {
  return '/view/' + photoInfo.userId + '/' + photoInfo.id + '/2000/2000'
}
