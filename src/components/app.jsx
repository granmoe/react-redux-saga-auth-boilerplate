import React from 'react'
import { BrowserRouter, Match, Miss, Link } from 'react-router'

import Counter from 'components/counter.jsx'
import Login from 'components/login.jsx'
import Profile from 'components/profile.jsx'
import 'components/app.less'

const App = () =>
  <BrowserRouter>
    <div className="app">
      <ul>
        <li><Link to="/">Async Counter</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>

      <hr/>

      <Match exactly pattern="/" component={ Counter } />
      <Match exactly pattern="/login" component={ Login } />
      <Match exactly pattern="/counter" component={ Counter } />
      <Match exactly pattern="/profile" component={ Profile } />
      <Miss component={ Counter }/>
    </div>
  </BrowserRouter>

export default App
