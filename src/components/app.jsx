import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import authService from 'utils/auth-service'
import { requestIncrement } from 'ducks/count'
import 'components/app.less'

class App extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    requestIncrement: PropTypes.func.isRequired
  }

  render () {
    const { count, requestIncrement } = this.props

    return (
      <div className="app">
        Count: { count }
        <button onClick={ requestIncrement } className="app__increment-btn" type="button">increment async</button>
        <button onClick={ authService.login } className="app__login-btn" type="button">Login</button>
      </div>
    )
  }
}

export default connect(state => {
  return {
    count: state.get('count')
  }
}, ({
  requestIncrement
}))(App)
