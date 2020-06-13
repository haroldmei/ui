import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request, postData } from 'utils/request';

import { actions } from './slice';
import { State } from 'types/State';
import { Knot } from 'types/Knot';
import { KnotErrorType } from './types';

export function* getForms() {
  yield delay(500);
  const engineURL = `http://192.168.0.8:5000/engine`;

  try {
    // Call our request helper (see 'utils/request')
    const knot: Knot = yield call(postData, engineURL, { answer: '42' });
    console.log(knot);
    yield put(actions.knotLoaded(knot));
  } catch (err) {}
}
/**
 * Root saga manages watcher lifecycle
 */
export function* dynamicFormSaga() {
  console.log('============= START ME ==================');
  yield takeLatest(actions.loadKnot.type, getForms);
}
