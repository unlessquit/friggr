import { takeEvery } from 'redux-saga'
import Cookies from 'js-cookie'

function storeLastUserId(action) {
  Cookies.set('lastUserId', action.userId)
}

export default function* rootSaga() {
  yield takeEvery('UPLOADING_PHOTO', storeLastUserId)
}
