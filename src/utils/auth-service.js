import Auth0Lock from 'auth0-lock'

import { auth0ClientId, domain } from 'config'
import { loginSuccess } from 'ducks/auth'

class AuthService {
  constructor (clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      redirectUrl: `${window.location.origin}`,
      responseType: 'token',
      auth: { params: { state: 'linking' } },
      // allowedConnections: ['facebook', 'google-oauth2'],
      languageDictionary: { // allows to override dictionary entries
        title: 'Link with:'
      }
    })

    this.lock.on('authenticated', this._doAuthentication)
    this.lock.on('authorization_error', this._authorizationError)
  }

  _doAuthentication = (authResult) => {
    authResult.state = authResult.state || ''
    this.store.dispatch(loginSuccess(authResult))

    // this.lock.getProfile(authResult.idToken, (error, profile) => {
    //   if (error) {
    //     console.log('Error loading the Profile', error)
    //   } else {
    //     this.setProfile(profile)
    //   }
    // })

    // this.linkAccount(authResult.idToken)
  }

  _authorizationError = (error) => {
    console.log('Authentication Error', error)
  }

  login = () => {
    this.lock.show()
  }

  setProfile = (profile) => {
    localStorage.setItem('profile', JSON.stringify(profile))
    // action to set profile on state
  }

  getProfile = () => {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  fetchApi = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    }

    const userId = this.getProfile().user_id
    return fetch(`https://${this.domain}/api/v2/users/${userId}/${url}`, {
      headers,
      ...options
    })
    .then(response => response.json())
  }

  linkAccount = (token) => {
    const data = {
      link_with: token
    }

    return this.fetchApi('identities', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => {
      const profile = this.getProfile()
      if (response.error) {
        alert(response.message)
      } else {
        this.setProfile({ ...profile, identities: response }) // updates profile identities
      }
    })
  }

  unlinkAccount = (identity) => {
    this.fetchApi(`identities/${identity.provider}/${identity.user_id}`, {
      method: 'DELETE'
    })
    .then(response => {
      const profile = this.getProfile()
      if (response.error) {
        alert(response.message)
      } else {
        this.setProfile({ ...profile, identities: response }) // updates profile identities
      }
    })
  }

  setStoreReference (store) {
    this.store = store
  }
}

export default new AuthService(auth0ClientId, domain)
