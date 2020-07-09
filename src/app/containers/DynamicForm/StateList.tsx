import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { KnotErrorType } from './types';
import { selectError } from './selectors';
import { StateControl } from './StateControl';
import { PageWrapper } from 'app/components/PageWrapper';

interface Props {
  id: string;
  states: any[];
  title: string;
}

export function StateList({ id, states, title }: Props) {
  const error = useSelector(selectError);

  return (
    <PageWrapper>
      {title}
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
    </PageWrapper>
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
