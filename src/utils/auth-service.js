import Auth0Lock from 'auth0-lock'
// import { browserHistory } from 'react-router'

import config from 'config'

class AuthService {
  constructor (clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/login',
        responseType: 'token'
      }
    })

    this.lock.on('authenticated', this._doAuthentication)
  }

  _doAuthentication = (authResult) => { // change to action that calls a saga
    this.setToken(authResult.idToken)
    // navigate to the home route
    // browserHistory.replace('/home')
  }

  login = () => {
    this.lock.show() // shows the widget
  }

  loggedIn = () => {
    return !!this.getToken()
  }

  setToken (idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken () { // turn this into a selector
    return localStorage.getItem('id_token')
  }

  logout () { // change to action that calls a saga
    localStorage.removeItem('id_token')
  }
}

export default new AuthService(config.auth0ClientId, config.domain)
