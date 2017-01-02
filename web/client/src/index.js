import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Cookies from 'js-cookie'

import App from './App'
import View from './components/View'
import HomePage from './HomePage'
import InboxPage from './InboxPage'
import { lastUserIdCookieLoaded, navigation } from './actions'
import reducer from './reducers'
import saga from './sagas'

var inDevMode = process.env.NODE_ENV === 'development'

function maybeApplyMiddleware (...maybeMiddlewares) {
  // Remove null middlewares
  return applyMiddleware.apply(null, maybeMiddlewares.filter(m => !!m))
}

const logger = createLogger({ diff: true })
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  maybeApplyMiddleware(
    sagaMiddleware,
    inDevMode && logger
  )
)
sagaMiddleware.run(saga)

let onNavigate = name => ({params}) => {
  store.dispatch(navigation(name, params))
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomePage} onEnter={onNavigate('home')} />
        <Route path='inbox' component={InboxPage} />
        <Route path='view/:userId' component={View} onEnter={onNavigate('view')} />
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
