import * as slice from '../slice';
import { DynamicState, KnotErrorType } from '../types';
import { Knot } from 'types/Knot';

describe('GithubRepoForm slice', () => {
  let state: DynamicState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle loadKnot', () => {
    expect(slice.reducer(state, slice.actions.loadKnot())).toEqual<
      DynamicState
    >({
      ...slice.initialState,
      loading: true,
      states: [],
      error: null,
    });
  });

  it('should handle knotLoaded', () => {
    const knot = { id: 'test', states: [] } as Knot;
    expect(slice.reducer(state, slice.actions.knotLoaded(knot))).toEqual<
      DynamicState
    >({
      ...slice.initialState,
      loading: false,
      states: knot.states,
    });
  });

  it('should handle repoError', () => {
    const repoError = KnotErrorType.KNOT_NOT_FOUND;
    expect(slice.reducer(state, slice.actions.knotError(repoError))).toEqual<
      DynamicState
    >({
      ...slice.initialState,
      error: repoError,
    });
  });
});
