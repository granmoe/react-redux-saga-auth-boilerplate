import 'babel-polyfill' // generator support
import 'oauthio-web'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { OAUTH_PUBLIC_KEY } from 'config'
import App from 'components/app.jsx'
import initStore from 'store'

const store = initStore()
OAuth.initialize(OAUTH_PUBLIC_KEY)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
)
