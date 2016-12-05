import { combineReducers } from 'redux-immutable'
import { call, spawn } from 'redux-saga/effects'
import count, { sagas as counterSagas } from 'ducks/count'
import auth from 'ducks/auth'

const reducers = {
  count,
  auth
}

export default combineReducers(reducers)

export function* rootSaga () {
  const sagas = [...counterSagas]

  yield sagas.map(saga =>
    spawn(function* () {
      let isSyncError = false
      while (!isSyncError) {
        isSyncError = true
        try {
          setTimeout(() => { isSyncError = false })
          yield call(saga)
        } catch (e) {
          if (isSyncError) {
            throw new Error(saga.name + ' was terminated because it threw an exception on startup.')
          }
          // handle exceptions here
        }
      }
    })
  )
}
