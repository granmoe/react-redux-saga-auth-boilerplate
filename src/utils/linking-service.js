import Auth0Lock from 'auth0-lock'

import { auth0ClientId, domain } from 'config'

class LinkingService {
  constructor (clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      redirectUrl: `${window.location.origin}/login`,
      responseType: 'token',
      auth: { params: { state: 'linking' } },
      allowedConnections: ['facebook', 'google-oauth2'],
      languageDictionary: { // allows to override dictionary entries
        title: 'Link with:'
      }
    })

    this.lock.on('authenticated', this._doAuthentication.bind(this))
    this.lock.on('authorization_error', this._authorizationError.bind(this))
  }

  _doAuthentication (authResult) {
    authResult.state = authResult.state || ''
    this.linkAccount(authResult.idToken)
  }

  _authorizationError (error) {
    console.log('Authentication Error', error)
  }

  setProfile (profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile () {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  fetchApi (url, options) {
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

  linkAccount (token) {
    // prepares api request body data
    const data = {
      link_with: token
    }
    // sends a post to auth0 api to create a new identity
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

  unlinkAccount (identity) {
    // sends a delete request to unlink the account identity
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

export default new LinkingService(auth0ClientId, domain)
