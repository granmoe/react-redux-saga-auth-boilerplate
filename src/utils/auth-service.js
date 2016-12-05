import Auth0Lock from 'auth0-lock'
import { isTokenExpired } from 'utils/jwt-helper'
// import { browserHistory } from 'react-router'

import { auth0ClientId, domain } from 'config'
import { setUserData, clearUserData } from 'ducks/auth'

class AuthService {
  constructor (clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000',
        responseType: 'token'
      }
    })

    this.lock.on('authenticated', this._doAuthentication)
  }

  _doAuthentication = (authResult) => {
    this.setToken(authResult.idToken)
    this.store.dispatch(setUserData(authResult))
    // navigate to the home route
    // browserHistory.replace('/home')
  }

  login = () => {
    this.lock.show() // shows the widget
  }

  isLoggedIn = () => {
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken (idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken () {
    return localStorage.getItem('id_token')
  }

  logout () {
    localStorage.removeItem('id_token')
    this.store.dispatch(clearUserData())
  }

  setStoreReference (store) {
    this.store = store
  }
}

export default new AuthService(auth0ClientId, domain)
