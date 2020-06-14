/*
 * GithubRepoForm Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DynamicState, KnotErrorType } from './types';
//import { State } from 'types/State';
import { Knot } from 'types/Knot';

// The initial state of the GithubRepoForm container
export const initialState: DynamicState = {
  id: 'root',
  states: [],
  loading: false,
  error: null,
};

const dynamicFormSlice = createSlice({
  name: 'dynamicForm',
  initialState,
  reducers: {
    loadKnot(state) {
      state.loading = true;
      state.error = null;
      state.states = [];
    },
    knotLoaded(state, action: PayloadAction<Knot>) {
      const knot = action.payload;
      state.states = knot.states;
      state.id = knot.id;
      state.loading = false;
    },
    knotError(state, action: PayloadAction<KnotErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = dynamicFormSlice;
