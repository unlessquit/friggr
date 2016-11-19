const status = (state = { message: 'Loading status...' }, action) => {
  switch (action.type) {
    case 'GOT_STATUS':
      return action.status
    default:
      return state
  }
}

export default status
