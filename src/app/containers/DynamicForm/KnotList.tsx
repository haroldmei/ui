import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { KnotErrorType } from './types';
import { TextButton } from './components/TextButton';
import { selectKnots, selectError, selectIndex } from './selectors';
import { actions } from './slice';
import Slider from 'react-slick';
import { StateList } from './StateList';

export function KnotList() {
  const knots = useSelector(selectKnots);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  let oldSlide: number = -1;
  let activeSlide: number = 0;

  if (!knots.length) {
    dispatch(actions.loadKnot());
    return <Wrapper>Loading first page</Wrapper>;
  } else {
    let slider: any = React.createRef();

    const next = (evt: any) => {
      dispatch(actions.loadKnot());
      console.log('check the knot: ', knots);

      slider.slickNext();
    };
    const previous = (evt: any) => {
      slider.slickPrev();
    };

    const settings = {
      dots: false,
      infinite: false,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,

      beforeChange: (current, next) => {
        console.log('oldSlide', oldSlide, next);
        oldSlide = current;
        activeSlide = next;
        dispatch(actions.indexLoaded(activeSlide));
      },
    };

    const isNextDisabled = () => {
      const kn = knots[activeSlide];
      console.log('updated?', kn);
      let disabled: boolean = false;
      for (let i = 0; i < kn.states.length; i++) {
        let curr = kn.states[i];
        if (!curr.answer) disabled = true;
      }
      return disabled;
    };

    const isPrevDisabled = () => {
      return false;
    };
    return (
      <Wrapper>
        <Slider ref={c => (slider = c)} {...settings}>
          {knots?.length > 0 ? (
            knots.map(knot => (
              <div key={1}>
                <h2>{knot.title}</h2>
                <StateList
                  id={knot.id}
                  title={knot.title}
                  states={knot.states}
                />
              </div>
            ))
          ) : error ? (
            <ErrorText>{repoErrorText(error)}</ErrorText>
          ) : null}
        </Slider>

        <div style={{ textAlign: 'center' }}>
          <button
            className="button"
            onClick={previous}
            disabled={isPrevDisabled()}
          >
            Previous
          </button>
          <button className="button" onClick={next} disabled={isNextDisabled()}>
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
