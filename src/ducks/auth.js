import Immutable from 'immutable'
import { takeLatest } from 'redux-saga'
import { call, take, put } from 'redux-saga/effects'

import authService from 'utils/auth-service'

const initialState = Immutable.Map({
  user: null
})

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return currentState.set('user', action.authResult)
    case CLEAR_USER_DATA:
      return currentState.set('user', null)
    default:
      return currentState
  }
}

export const setUserData = authResult => ({ type: SET_USER_DATA, authResult })

export const clearUserData = () => ({ type: CLEAR_USER_DATA })

/*
 SAGA CODE
*/

export const login = () => ({ type: LOGIN })

function* loginWatcher () {
  yield takeLatest(LOGIN, loginWorker)
}

function* loginWorker () {
  yield call(authService.login)
}

export const loginSuccess = authResult => ({ type: LOGIN_SUCCESS, authResult })

function* loginSuccessSaga () {
  while (true) {
    const { authResult } = yield take(LOGIN_SUCCESS)
    yield call([localStorage, localStorage.setItem], 'id_token', authResult.idToken)
    yield put(setUserData(authResult))
  }
}

export const logout = () => ({ type: LOGOUT })

function* logoutSaga () {
  while (true) {
    yield take(LOGOUT)
    yield call([localStorage, localStorage.removeItem], 'id_token')
    yield put(clearUserData())
    // redirect to home page?
  }
}

export const sagas = [loginWatcher, loginSuccessSaga, logoutSaga]

// BORING OLD CONSTANTS
const SET_USER_DATA = 'set-user-data'
const CLEAR_USER_DATA = 'clear-user-data'
const LOGIN = 'login'
const LOGIN_SUCCESS = 'login-success'
const LOGOUT = 'logout'

