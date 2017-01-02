import { isTokenExpired } from 'utils/jwt-helper'

export const isLoggedIn = state => {
  const token = getToken(state)
  return !!token && !isTokenExpired(token)
}

export const getToken = state => state.getIn(['auth', 'user', 'idToken'])

export const getUsername = state => state.getIn(['auth', 'profile', 'name'])

export const getUserPictureUrl = state => state.getIn(['auth', 'profile', 'picture'])
