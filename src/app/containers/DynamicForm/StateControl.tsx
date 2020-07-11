import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { KnotErrorType } from './types';
import { Check, Radio } from 'app/components/Input';
import { FormLabel } from 'app/components/FormLabel';
import { actions } from './slice';
import { TextButton } from './components/TextButton';
import { selectKnots, selectIndex, selectError } from './selectors';

import {
  Input,
  Color,
  Date,
  File,
  Range,
  Image,
  Password,
  Button,
} from 'app/components/Input';

interface Props {
  id: string;
  title: string;
  type: string;
  data: any;
}

export function StateControl({ id, title, type, data }: Props) {
  const error = useSelector(selectError);
  const knots = useSelector(selectKnots);
  const index = useSelector(selectIndex);
  const dispatch = useDispatch();

  const onChangeState = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    let numberFilled = 0;

    // pick the last knot
    let currentKnot = JSON.parse(JSON.stringify(knots[index]));
    console.log('current pate: ', index);
    let currStates = currentKnot['states'];
    for (let i = 0; i < currStates.length; i++) {
      if (currStates[i].id === id) {
        let idx = currStates[i].data.indexOf(value);
        if (currStates[i].type === '2') {
          console.log('type 2', value, currStates[i].answer);
          if (currStates[i].answer == null) currStates[i].answer = [];
          currStates[i].answer.push(idx);
        } else currStates[i].answer = idx;
      }

      if (currStates[i].answer != null) {
        numberFilled = numberFilled + 1;
      }
    }
    console.log('currentKnot', currentKnot);
    dispatch(actions.stateLoaded(currentKnot));

    if (currStates.length === numberFilled) {
      dispatch(actions.loadKnot());
    }
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
  };

  //console.log(id, type, typeof type);
  const t = parseInt(type);
  if (t === 0) {
    return (
      <Wrapper>
        <FormLabel>Unknown control </FormLabel>
      </Wrapper>
    );
  } else if (t === 1) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          {data?.length > 0 ? (
            <List>
              {data.map(state => (
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
  } else if (t === 2) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          {data?.length > 0 ? (
            <List>
              {data.map(state => (
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
  } else if (t === 3) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          <Input name={title} id={title} label={data} value="input" />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 4) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          <Color name={title} id={title} label={data} value="color" />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 5) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          <Date name={title} id={title} label={data} value="date" />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 6) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          <File name={title} id={title} label={data} />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 7) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          <Range name={title} id={title} label={data} />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 8) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          <Image name={title} id={title} label={data} />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 9) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          <Password name={title} id={title} label={data} />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 10) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <Name>{title}</Name>
          <Button name={title} id={title} label={data} value="button" />
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

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;
`;
