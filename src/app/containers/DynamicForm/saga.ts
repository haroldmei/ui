import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { postData } from 'utils/request';

import { actions } from './slice';
import { Knot } from 'types/Knot';
import { selectKnots } from './selectors';

export function* getForms() {
  yield delay(500);
  const engineURL = `http://ec2-13-238-84-181.ap-southeast-2.compute.amazonaws.com:5000/engine/`;

  const states = yield select(selectKnots);

  try {
    // Call our request helper (see 'utils/request')
    const knot: Knot = yield call(
      postData,
      engineURL,
      states[states.length - 1],
    );
    yield put(actions.knotLoaded(knot));
  } catch (err) {}
}
/**
 * Root saga manages watcher lifecycle
 */
export function* dynamicFormSaga() {
  yield takeLatest(actions.loadKnot.type, getForms);
}
