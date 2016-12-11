import React from 'react'
import { connect } from 'react-redux'

import { login } from 'ducks/auth'

class Login extends React.Component {
  render () {
    const { login } = this.props

    return (
      <button onClick={ login } type="button">Login</button>
    )
  }
}

export default connect(null, { login })(Login)
