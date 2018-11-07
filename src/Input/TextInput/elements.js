import styled, { css } from 'styled-components';
import { placeholder } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: ${({ width }) => width};
  height: 4rem;
  overflow: hidden;

  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  background-color: ${({ theme: { palette } }) => palette.white};

  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme: { palette } }) => palette.failure.default};
    `};

  ${({ warning }) =>
    warning &&
    css`
      border-color: ${({ theme: { palette } }) => palette.warning.default};
    `};

  ${({ success }) =>
    success &&
    css`
      border-color: ${({ theme: { palette } }) => palette.success.default};
    `};

  ${({ info }) =>
    info &&
    css`
      border-color: ${({ theme: { palette } }) => palette.primary.default};
    `};

  ${({ hasFocus }) =>
    hasFocus &&
    css`
      border-color: ${({ theme: { palette } }) => palette.primary.default};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      border-color: ${({ theme: { palette } }) => palette.lightGrey};
    `};
`;

export const InputElement = styled.input`
  flex: 1;
  height: 100%;
  background-color: ${({ theme: { palette } }) => palette.white};

  margin: 0 ${({ theme: { dimensions } }) => dimensions.small};
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  ${({ theme: { palette } }) => placeholder({ color: palette.darGrey })}
  ${placeholder({
    'font-size': '1.4rem',
  })};

  font-size: 1.4rem;
  border: none;
  padding: 0;
  text-align: left;
  &:focus,
  &:active {
    outline: none;
  }
`;
