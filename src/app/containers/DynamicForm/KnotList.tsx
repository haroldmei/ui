import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { KnotErrorType } from './types';
import { TextButton } from './components/TextButton';
import { selectKnots, selectError } from './selectors';
import { StateList } from './StateList';
import { actions } from './slice';

export function KnotList() {
  const knots = useSelector(selectKnots);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  if (!knots.length) {
    dispatch(actions.loadKnot());
    return <Wrapper>Loading first page</Wrapper>;
  } else {
    return (
      <Wrapper>
        {knots?.length > 0 ? (
          <List>
            {knots.map(knot => (
              <StateList key={knot.id} id={knot.id} states={knot.states} />
            ))}
          </List>
        ) : error ? (
          <ErrorText>{repoErrorText(error)}</ErrorText>
        ) : null}
      </Wrapper>
    );
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

const List = styled.div``;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;
