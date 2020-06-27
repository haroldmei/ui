import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { KnotErrorType } from './types';
import { Radio } from 'app/components/Radio';
import { Check } from 'app/components/Input';
import { FormLabel } from 'app/components/FormLabel';
import { actions } from './slice';
import { TextButton } from './components/TextButton';
import { selectKnots, selectError } from './selectors';

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
  const states = useSelector(selectKnots);
  const dispatch = useDispatch();

  const onChangeState = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    let numberFilled = 0;
    let current = JSON.parse(JSON.stringify(states[states.length - 1]));

    let stat = current['states'];
    for (let i = 0; i < stat.length; i++) {
      if (stat[i].id === id) {
        stat[i].answer = stat[i].data.indexOf(value);
      }

      if (stat[i].answer != null) {
        numberFilled = numberFilled + 1;
      }
    }
    //console.log(stat, numberFilled);

    dispatch(actions.stateLoaded(current));

    if (stat.length === numberFilled) {
      dispatch(actions.loadKnot());
    }
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      //console.log('===', evt);
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
          <FormLabel>{title}</FormLabel>
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
          <FormLabel>{title}</FormLabel>
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
          <FormLabel>{title}</FormLabel>
          <Input name={title} id={title} label={data} value="input" />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 4) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{title}</FormLabel>
          <Color name={title} id={title} label={data} value="color" />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 5) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{title}</FormLabel>
          <Date name={title} id={title} label={data} value="date" />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 6) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{title}</FormLabel>
          <File name={title} id={title} label={data} />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 7) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{title}</FormLabel>
          <Range name={title} id={title} label={data} />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 8) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{title}</FormLabel>
          <Image name={title} id={title} label={data} />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 9) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{title}</FormLabel>
          <Password name={title} id={title} label={data} />
        </FormGroup>
      </Wrapper>
    );
  } else if (t === 10) {
    return (
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{title}</FormLabel>
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
