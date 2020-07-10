import React, { Component } from 'react';
import Slider from 'react-slick';

import styled from 'styled-components/macro';
import { KnotErrorType } from './types';
import { StateList } from './StateList';
import { Knot } from 'types/Knot';
import { TextButton } from './components/TextButton';

type Props = {
  /*props properties*/
  kn: Knot[];
  err: any;
};
export default class PreviousNext extends Component<Props> {
  slider: any;
  knots: Knot[];
  error: any;

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.knots = props.kn;
    this.error = props.err;
    this.slider = React.createRef();
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Wrapper>
        <h2>Previous and Next methods</h2>
        <Slider ref={c => (this.slider = c)} {...settings}>
          {this.knots?.length > 0 ? (
            <List key={1}>
              {this.knots.map(knot => (
                <StateList
                  key={knot.id}
                  id={knot.id}
                  title={knot.title}
                  states={knot.states}
                />
              ))}
            </List>
          ) : this.error ? (
            <ErrorText>{repoErrorText(this.error)}</ErrorText>
          ) : null}

          <div key={1}>
            <h3>Put a test panel here </h3>
          </div>
        </Slider>

        <div style={{ textAlign: 'center' }}>
          <button className="button" onClick={this.previous}>
            Previous
          </button>
          <button className="button" onClick={this.next}>
            Next
          </button>
        </div>
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

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;
const List = styled.div``;

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;
