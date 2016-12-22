import Auth0Lock from 'auth0-lock'

import { auth0ClientId, domain } from 'config'
import { loginSuccess } from 'ducks/auth'

class AuthService {
  constructor (clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000', // replace with your app's URL
        responseType: 'token'
      }
    })

    this.lock.on('authenticated', this._doAuthentication)
    this.lock.on('authorization_error', this._authorizationError)
  }

  _doAuthentication = (authResult) => {
    this.store.dispatch(loginSuccess(authResult))
  }

  _authorizationError = (error) => {
    console.log('Authentication Error', error)
  }

  login = () => {
    this.lock.show()
  }

  setStoreReference (store) {
    this.store = store
  }
}

export default new AuthService(auth0ClientId, domain)
