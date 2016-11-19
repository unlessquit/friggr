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
