import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { KnotErrorType } from './types';
import { TextButton } from './components/TextButton';
import { selectError } from './selectors';
import { StateControl } from './StateControl';

interface Props {
  id: string;
  states: any[];
}

export function StateList({ id, states }: Props) {
  const error = useSelector(selectError);

  return (
    <Wrapper>
      {states?.length > 0 ? (
        <List>
          {states.map(state => (
            <StateControl
              key={state.id}
              id={state.id}
              title={state.title}
              type={state.type}
              data={state.data}
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
