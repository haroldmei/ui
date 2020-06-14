import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { KnotErrorType } from './types';
import { Radio } from 'app/components/Radio';
import { FormLabel } from 'app/components/FormLabel';

import { sliceKey, reducer, actions } from './slice';

import State from 'types/State';
import { TextButton } from './components/TextButton';
import { selectStates, selectError } from './selectors';

interface Props {
  id: string;
  title: string;
  type: number;
  options: string[];
}

export function StateControl({ id, title, type, options }: Props) {
  const error = useSelector(selectError);
  const states = useSelector(selectStates);

  const dispatch = useDispatch();
  const onChangeState = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    //console.log(value, id);
    let numberFilled = 0;
    for (let i = 0; i < states.length; i++) {
      if (states[i].id == value) {
        states[i].answer = value;
      }

      if (states[i].answer) {
        numberFilled = numberFilled + 1;
      }

      console.log(
        '============= UPDATE STATE ==============',
        value,
        states[i].id,
        states[i].answer,
        numberFilled,
        states.length,
      );
    }

    if (states.length == numberFilled) {
      dispatch(actions.loadKnot());
    }
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      console.log('===', evt);
      evt.preventDefault();
    }
  };

  if (type == 0) {
    return (
      <Wrapper>
        <FormLabel>{title}</FormLabel>
      </Wrapper>
    );
  } else if (type == 1) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{title}</FormLabel>
          {options?.length > 0 ? (
            <List>
              {options.map(state => (
                <Radio
                  key={state}
                  name={id}
                  id={state}
                  label={state}
                  onChange={onChangeState}
                  value={id}
                />
              ))}
            </List>
          ) : error ? (
            <ErrorText>{repoErrorText(error)}</ErrorText>
          ) : null}
        </FormGroup>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <FormLabel>Uninitialized</FormLabel>
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

const RadioButton = styled.div`
  display: flex;

  .radio {
    margin-right: 1.5rem;
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