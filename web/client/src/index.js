import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Cookies from 'js-cookie'

import App from './App'
import View from './components/View'
import Inbox from './containers/Inbox'
import Status from './containers/Status'
import { gotStatus, lastUserIdCookieLoaded } from './actions'
import reducer from './reducers'

const store = createStore(reducer)

let visitStatus = () => {
  window.fetch('/status.json')
    .then(res => res.json())
    .then(data => store.dispatch(gotStatus(data)))
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Status} onEnter={visitStatus} />
        <Route path='inbox' component={Inbox} />
        <Route path='view/:userId' component={View} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

// Load lastUserId from cookie - move to redux-saga
let lastUserId = Cookies.get('lastUserId')
if (lastUserId) {
  store.dispatch(lastUserIdCookieLoaded(lastUserId))
}
