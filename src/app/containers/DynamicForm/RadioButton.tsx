import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { KnotErrorType } from './types';
import { Radio } from 'app/components/Radio';
import State from 'types/State';
import { TextButton } from './components/TextButton';
import { selectStates, selectError } from './selectors';

export function RadioButton() {
  const states = useSelector(selectStates);
  const error = useSelector(selectError);

  return (
    <Wrapper>
      {states?.length > 0 ? (
        <List>
          {states.map(state => (
            <Radio
              id={state.id}
              label={state.title}
              className="radio"
              name="theme"
            />
          ))}
        </List>
      ) : error ? (
        <ErrorText>{repoErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
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
