import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { KnotErrorType } from './types';
import { TextButton } from './components/TextButton';
import { selectKnots, selectError } from './selectors';
import PreviousNext from './PrevNext';
import { actions } from './slice';

export function KnotList() {
  const knots = useSelector(selectKnots);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  if (!knots.length) {
    dispatch(actions.loadKnot());
    return <Wrapper>Loading first page</Wrapper>;
  } else {
    return <PreviousNext kn={knots} err={error} />;
  }
}

export const repoErrorText = (error: KnotErrorType) => {
  switch (error) {
    case KnotErrorType.KNOT_NOT_FOUND:
      return 'There is no such knot 😞';
    default:
      return 'An error has occurred!';
  }
};

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;
