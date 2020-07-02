import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { postData } from 'utils/request';

import { actions } from './slice';
import { Knot } from 'types/Knot';
import { selectKnots } from './selectors';

export function* getForms() {
  yield delay(500);
  const engineURL = `https://backend.hmei.me/engine`;

  const states = yield select(selectKnots);

  console.log('========', engineURL);
  try {
    // Call our request helper (see 'utils/request')
    const knot: Knot = yield call(
      postData,
      engineURL,
      states[states.length - 1],
    );
    console.log('========', engineURL);
    yield put(actions.knotLoaded(knot));
  } catch (err) {}
}
/**
 * Root saga manages watcher lifecycle
 */
export function* dynamicFormSaga() {
  yield takeLatest(actions.loadKnot.type, getForms);
}
