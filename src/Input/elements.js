import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: ${({ width }) => width};
  height: 4rem;

  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  border: 1px solid ${({ theme: { palette } }) => palette.gray};
  background-color: ${({ theme: { palette } }) => palette.white};

  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme: { palette } }) => palette.red};
    `};

  ${({ warning }) =>
    warning &&
    css`
      border-color: ${({ theme: { palette } }) => palette.orange};
    `};

  ${({ success }) =>
    success &&
    css`
      border-color: ${({ theme: { palette } }) => palette.green};
    `};

  ${({ info }) =>
    info &&
    css`
      border-color: ${({ theme: { palette } }) => palette.blue};
    `};

  ${({ hasFocus }) =>
    hasFocus &&
    css`
      border-color: ${({ theme: { palette } }) => palette.blue};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      border-color: ${({ theme: { palette } }) => palette.gray};
    `};
`;

export const InputElement = styled.input`
  flex: 1;
  height: 100%;
  background-color: ${({ theme: { palette } }) => palette.white};

  margin: 0 ${({ theme: { dimensions } }) => dimensions.small};
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  font-size: 1.2rem;
  border: none;
  padding: 0;
  text-align: left;
  &:focus,
  &:active {
    outline: none;
  }
`;
