/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

it('renders without crashing', () => {
  const store = createStore(state => state, {})
  const div = document.createElement('div')
  ReactDOM.render(<Provider store={store}><App /></Provider>, div)
})
