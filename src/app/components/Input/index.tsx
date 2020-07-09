import React, { memo } from 'react';
import styled from 'styled-components/macro';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface Props extends InputProps {
  id: string;
  label: string;
  className?: string;
  isSelected?: boolean;
}

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

export const Check = memo(
  ({ id, label, className, isSelected, ...restOf }: Props) => {
    return (
      <Wrapper className={className}>
        <input type="checkbox" id={id} checked={isSelected} {...restOf} />
        <label htmlFor={id}>{label}</label>
      </Wrapper>
    );
  },
);

export const Radio = memo(
  ({ id, label, className, isSelected, ...restOf }: Props) => {
    return (
      <Wrapper className={className}>
        <input type="radio" id={id} checked={isSelected} {...restOf} />
        <label htmlFor={id}>{label}</label>
      </Wrapper>
    );
  },
);

export const Input = memo(({ id, label, className, ...restOf }: Props) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={id}>{label} </label>
      <input type="input" id={id} onChange={handleInputChange} {...restOf} />
    </Wrapper>
  );
});

export const Color = memo(({ id, label, className, ...restOf }: Props) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={id}>{label} </label>
      <input type="color" id={id} onChange={handleInputChange} {...restOf} />
    </Wrapper>
  );
});

export const Date = memo(({ id, label, className, ...restOf }: Props) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={id}>{label} </label>
      <input type="date" id={id} onChange={handleInputChange} {...restOf} />
    </Wrapper>
  );
});

export const File = memo(({ id, label, className, ...restOf }: Props) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={id}>{label} </label>
      <input type="file" id={id} onChange={handleInputChange} {...restOf} />
    </Wrapper>
  );
});

export const Range = memo(({ id, label, className, ...restOf }: Props) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={id}>{label} </label>
      <input type="range" id={id} onChange={handleInputChange} {...restOf} />
    </Wrapper>
  );
});

export const Image = memo(({ id, label, className, ...restOf }: Props) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={id}>{label} </label>
      <input
        type="image"
        id={id}
        alt={id}
        onChange={handleInputChange}
        {...restOf}
      />
    </Wrapper>
  );
});

export const Password = memo(({ id, label, className, ...restOf }: Props) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={id}>{label} </label>
      <input type="password" id={id} onChange={handleInputChange} {...restOf} />
    </Wrapper>
  );
});

export const Button = memo(({ id, label, className, ...restOf }: Props) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={id}>{label} </label>
      <input type="button" id={id} onChange={handleInputChange} {...restOf} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  min-height: 2rem;
  font-weight: 500;
  color: ${p => p.theme.text};

  &:nth-child(odd) {
    background-color: ${p => p.theme.backgroundVariant};
  }
`;
