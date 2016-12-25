const lastUserId = (state = '', action) => {
  switch (action.type) {
    case 'NAVIGATION':
      switch (action.name) {
        case 'view':
          return action.params.userId
        default:
          return state
      }
    case 'LAST_USER_ID_COOKIE_LOADED':
      return state || action.lastUserId
    default:
      return state
  }
}

export default lastUserId
