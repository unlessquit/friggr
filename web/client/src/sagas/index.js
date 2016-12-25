import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { gotStatus } from '../actions'
import Cookies from 'js-cookie'

function storeLastUserId ({userId}) {
  Cookies.set('lastUserId', userId, { expires: 365 })
}

function* navigation (action) {
  switch (action.name) {
    case 'home':
      var res = yield window.fetch('/status.json')
      var status = yield res.json()
      yield put(gotStatus(status))
      break
    case 'view':
      storeLastUserId(action.params)
      break
    default:
      yield null
  }
}

export default function* rootSaga () {
  yield takeEvery('UPLOADING_PHOTO', storeLastUserId)
  yield takeEvery('NAVIGATION', navigation)
}
