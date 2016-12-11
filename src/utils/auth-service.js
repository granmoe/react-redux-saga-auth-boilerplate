import Auth0Lock from 'auth0-lock'

import { auth0ClientId, domain } from 'config'
import { setUserData } from 'ducks/auth'

class AuthService {
  constructor (clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000', // replace with your app's URL
        responseType: 'token'
      }
    })

    this.lock.on('authenticated', this._doAuthentication)
  }

  _doAuthentication = (authResult) => {
    this.store.dispatch(setUserData(authResult))
  }

  login = () => {
    this.lock.show()
  }

  setStoreReference (store) {
    this.store = store
  }
}

export default new AuthService(auth0ClientId, domain)
