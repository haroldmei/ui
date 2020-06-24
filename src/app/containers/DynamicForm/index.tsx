import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
//import { SubTitle } from 'app/containers/HomePage/components/SubTitle';
import { useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { dynamicFormSaga } from './saga';

import { FormLabel } from 'app/components/FormLabel';

import { TextButton } from './components/TextButton';

import {
  Color,
  Date,
  File,
  Range,
  Image,
  Password,
  Button,
} from 'app/components/Input';

import { KnotList } from './KnotList';
//import { Button } from 'app/components/Button';

//import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { themes } from 'styles/theme/themes';

export function DynamicForm() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: dynamicFormSaga });

  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.loadKnot());
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
  };

  return (
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}></FormGroup>
      <KnotList />

      <Color name="name" id="id" label="color" value="value" />

      <Date name="date" id="date" label="date" value="date" />

      <File name="file" id="file" label="file" />

      <Range name="range" id="range" label="range" />

      <Image name="image" id="image" label="image" />

      <Password name="password" id="password" label="password" />

      <Button name="button" id="button" label="button" value="button" />

      {/*<Button scale="normal" kind="primary" outline={true}>
        submit
      </Button>*/}

      <TextButton theme={themes.light} type="button">
        This is a text button
      </TextButton>
    </Wrapper>
  );
}

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
