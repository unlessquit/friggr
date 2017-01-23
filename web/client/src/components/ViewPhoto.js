import React from 'react'

export default ({photo}) => {
  var url = viewPhotoPath(photo)

  // img key attribute forces immediate display of new photo even when
  // it's not yet loaded (giving user feedback that his action has
  // been registered).
  return (
    <div className='view-page'>
      <img key={photo.id} className='photo' role='presentation' src={url} />
    </div>
  )
}

function viewPhotoPath (photoInfo) {
  return '/view/' + photoInfo.userId + '/' + photoInfo.id + '/2000/2000'
}
