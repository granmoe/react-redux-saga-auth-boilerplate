import Auth0Lock from 'auth0-lock'
import Immutable from 'immutable'
import { call, take, put } from 'redux-saga/effects'

import { auth0ClientId, auth0Domain } from 'config'
import { getStoredAuthState, setStoredAuthState, removeStoredAuthState } from 'utils/local-storage'

const initialState = Immutable.Map({
  profile: null,
  idToken: null
})

export default function reducer (state = initialState.merge(getStoredAuthState()), action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.merge({
        idToken: action.idToken,
        profile: action.profile,
      })
    case LOGIN_FAILURE:
      return state.merge({
        idToken: null,
        profile: null,
        error: action.error
      })
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export const login = () => ({ type: LOGIN })

export const logout = () => ({ type: LOGOUT })

const loginSuccess = (profile, idToken) => ({ type: LOGIN_SUCCESS, profile, idToken })

const loginFailure = error => ({ type: LOGIN_FAILURE, error })

export function* watchLoginRequest () {
  while (true) {
    yield take(LOGIN)
    yield call(loginRequestSaga)
  }
}

function* loginRequestSaga () {
  const lock = new Auth0Lock(auth0ClientId, auth0Domain, {
    allowedConnections: ['facebook', 'google-oauth2'],
    redirectUrl: `${window.location.origin}`,
    responseType: 'token',
    auth: {
      redirect: false
    }
  })

  const showLock = () =>
    new Promise((resolve, reject) => {
      lock.on('hide', () => reject('Lock closed'))

      lock.on('authenticated', (authResult) => {
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (!error) {
            lock.hide()
            resolve({ profile: Immutable.fromJS(profile), idToken: authResult.idToken })
          }
        })
      })

      // TODO: lock.on('authorization_error', error => whatever)
      lock.on('unrecoverable_error', (error) => {
        lock.hide()
        reject(error)
      })

      lock.show()
    })

  try {
    const { profile, idToken } = yield call(showLock)
    yield put(loginSuccess(profile, idToken))
    // TODO: yield put(push('/whatever'))
  } catch (error) {
    yield put(loginFailure(error))
    // TODO: yield put(push('/'))
  }
}

export function* watchLoginSuccess () {
  while (true) {
    const { profile, idToken } = yield take(LOGIN_SUCCESS)
    yield call(setStoredAuthState, profile, idToken)
  }
}

export function* watchLoginFailure () {
  while (true) {
    yield take(LOGIN_FAILURE)
    yield call(removeStoredAuthState)
  }
}

export function* watchLogout () {
  while (true) {
    yield take(LOGOUT)
    yield call(removeStoredAuthState)
    // yield put(push('/'))
  }
}

export const sagas = [watchLoginRequest, watchLoginSuccess, watchLoginFailure, watchLogout]

const LOGIN = 'login'
const LOGIN_SUCCESS = 'login-success'
const LOGIN_FAILURE = 'login-failure'
const LOGOUT = 'logout'

/* TODO: implement link/unlink and secure API code

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

*/
