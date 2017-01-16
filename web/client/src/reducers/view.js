const reducer = (state = { userId: null, photos: null }, action) => {
  switch (action.type) {
    // TODO: clear data when user changes
    case 'GOT_VIEW_DATA':
      return {
        userId: action.userId,
        photos: action.photos
      }
    case 'NAVIGATION_VIEW':
      if (action.userId !== state.userId) {
        return {
          ...state,
          userId: action.userId,
          photos: null
        }
      }
      return state
    default:
      return state
  }
}

export default reducer
