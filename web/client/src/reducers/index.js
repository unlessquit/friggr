import { combineReducers } from 'redux'
import status from './status'
import view from './view'
import lastUserId from './lastUserId'

const reducer = combineReducers({
  status,
  view,
  lastUserId
})

export default reducer
