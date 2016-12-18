import 'babel-polyfill' // generator support
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from 'components/app.jsx'
import initStore from 'store'
import authService from 'utils/auth-service'
import linkingService from 'utils/linking-service'

const store = initStore()
authService.setStoreReference(store) // FIXME
linkingService.setStoreReference(store) // FIXME

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
)
