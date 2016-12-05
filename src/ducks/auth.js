import Immutable from 'immutable'

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

const SET_USER_DATA = 'set-user-data'
const CLEAR_USER_DATA = 'clear-user-data'
