const reducer = (state = { current: null, userId: null, photos: null }, action) => {
  switch (action.type) {
    // TODO: clear data when user changes
    case 'GOT_VIEW_DATA':
      return {
        userId: action.userId,
        photos: action.photos,
        current: 0
      }
    case 'VIEW_NEXT_PHOTO':
      return {
        ...state,
        current: state.current > 0
          ? state.current - 1
          : 0
      }
    case 'VIEW_PREVIOUS_PHOTO':
      return {
        ...state,
        current: state.current < state.photos.length - 1
          ? state.current + 1
          : state.current
      }
    case 'NAVIGATION_VIEW':
      if (action.userId !== state.userId) {
        return {
          ...state,
          userId: action.userId,
          photos: null,
          current: null
        }
      }
      return state
    default:
      return state
  }
}

export default reducer
