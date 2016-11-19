const lastUserId = (state = 'test', action) => {
  switch (action.type) {
    case 'LAST_USER_ID_COOKIE_LOADED':
      return action.lastUserId
    default:
      return state
  }
}

export default lastUserId
