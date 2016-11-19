import { combineReducers } from 'redux'
import status from './status'
import lastUserId from './lastUserId'

const reducer = combineReducers({
  status,
  lastUserId
})

export default reducer
