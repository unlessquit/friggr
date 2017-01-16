export const navigation = (name, params) => {
  return {
    type: 'NAVIGATION',
    name: name,
    params: params
  }
}

export const navigationView = (userId) => {
  return {
    type: 'NAVIGATION_VIEW',
    userId: userId
  }
}

export const uploadingPhoto = (userId) => {
  return {
    type: 'UPLOADING_PHOTO',
    userId: userId
  }
}

export const lastUserIdCookieLoaded = (lastUserId) => {
  return {
    type: 'LAST_USER_ID_COOKIE_LOADED',
    lastUserId: lastUserId
  }
}

export const gotStatus = (status) => {
  return {
    type: 'GOT_STATUS',
    status: status
  }
}

export const gotViewData = ({photos, userId}) => {
  return {
    type: 'GOT_VIEW_DATA',
    photos,
    userId
  }
}

export const viewNextPhoto = () => {
  return {type: 'VIEW_NEXT_PHOTO'}
}

export const viewPreviousPhoto = () => {
  return {type: 'VIEW_PREVIOUS_PHOTO'}
}
