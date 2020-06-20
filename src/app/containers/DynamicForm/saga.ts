import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { postData } from 'utils/request';

import { actions } from './slice';
import { Knot } from 'types/Knot';
import { selectStates, selectError } from './selectors';

export function* getForms() {
  yield delay(500);
  const engineURL = `http://localhost:5000/engine`;

  const states = yield select(selectStates);

  try {
    // Call our request helper (see 'utils/request')
    const knot: Knot = yield call(postData, engineURL, { answer: '42' });
    console.log('==============KNOT================');
    console.log(states, knot);
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
