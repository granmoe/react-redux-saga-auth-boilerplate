import React from 'react'
import { BrowserRouter, Match, Miss, Link } from 'react-router'

import authService from 'utils/auth-service'
import Counter from 'components/counter.jsx'
import 'components/app.less'

const App = () =>
  <BrowserRouter>
    <div className="app">
      <ul>
        <li><Link to="/">Async Counter</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <button onClick={ authService.login } className="app__login-btn" type="button">Login</button>

      <Match exactly pattern="/" component={ Counter } />
      <Miss component={ Counter }/>
    </div>
  </BrowserRouter>

export default App
