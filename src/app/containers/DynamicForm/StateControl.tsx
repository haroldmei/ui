import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { call, put, takeLatest, delay } from 'redux-saga/effects';

import { KnotErrorType } from './types';
import { Radio } from 'app/components/Radio';
import { Check } from 'app/components/Check';
import { FormLabel } from 'app/components/FormLabel';

import { sliceKey, reducer, actions } from './slice';

import { TextButton } from './components/TextButton';
import { selectKnots, selectError } from './selectors';

interface Props {
  id: string;
  title: string;
  type: number;
  options: string[];
}

export function StateControl({ id, title, type, options }: Props) {
  const error = useSelector(selectError);
  const states = useSelector(selectKnots);

  const dispatch = useDispatch();
  const onChangeState = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    let numberFilled = 0;
    let current = JSON.parse(JSON.stringify(states[states.length - 1]));

    console.log('==============stateLoaded KNOT================');
    console.log(states);
    console.log(current);

    let stat = current['states'];
    for (let i = 0; i < stat.length; i++) {
      if (stat[i].id == id) {
        stat[i].answer = stat[i].data.indexOf(value);
      }

      if (stat[i].answer != null) {
        numberFilled = numberFilled + 1;
      }
    }
    console.log(stat, numberFilled);

    dispatch(actions.stateLoaded(current));

    if (stat.length == numberFilled) {
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

  //console.log(id, title, type);
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
                  value={state}
                />
              ))}
            </List>
          ) : error ? (
            <ErrorText>{repoErrorText(error)}</ErrorText>
          ) : null}
        </FormGroup>
      </Wrapper>
    );
  } else if (type == 2) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{title}</FormLabel>
          {options?.length > 0 ? (
            <List>
              {options.map(state => (
                <Check
                  key={state}
                  name={id}
                  id={state}
                  label={state}
                  onChange={onChangeState}
                  value={state}
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
