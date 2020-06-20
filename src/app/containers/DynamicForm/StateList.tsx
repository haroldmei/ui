import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { KnotErrorType } from './types';
import State from 'types/State';
import { TextButton } from './components/TextButton';
import { selectError, selectId } from './selectors';
import { StateControl } from './StateControl';
import { FormLabel } from 'app/components/FormLabel';
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
              options={state.data}
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

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;
