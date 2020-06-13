import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.dynamicForm || initialState;

export const selectId = createSelector(
  [selectDomain],
  dynamicFormState => dynamicFormState.id,
);

export const selectStates = createSelector(
  [selectDomain],
  dynamicFormState => dynamicFormState.states,
);

export const selectLoading = createSelector(
  [selectDomain],
  dynamicFormState => dynamicFormState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  dynamicFormState => dynamicFormState.error,
);
