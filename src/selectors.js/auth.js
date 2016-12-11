import { isTokenExpired } from 'utils/jwt-helper'

export const isLoggedIn = state => {
  const token = getToken(state)
  return !!token && !isTokenExpired(token)
}

export const getToken = state => state.getIn(['auth', 'user', 'idToken'])
