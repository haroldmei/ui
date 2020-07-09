import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
//import { Masthead } from './Masthead';
import { PageWrapper } from 'app/components/PageWrapper';
import { DynamicForm } from 'app/containers/DynamicForm';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        {/*<Masthead /> */}
        {/*<Features /> */}
        <DynamicForm />
      </PageWrapper>
    </>
  );
}
