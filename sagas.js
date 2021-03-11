import { put, takeEvery, all, call } from 'redux-saga/effects'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  console.log("Hello Sagas!")
}

// Our worker saga: will perform the async increment task
export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' }) // instructs the middleware to dispatch an INCREMENT action.
  /*
  put is one example of what we call an Effect.
  Effects are plain JavaScript objects which contain instructions to be fulfilled by the middleware.
  When a middleware retrieves an Effect yielded by a Saga, the Saga is paused until the Effect is fulfilled.
  */
}

// our watcher saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

//notice how we now only export the rootSaga
// single entrypoint to start all sagas at once

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
