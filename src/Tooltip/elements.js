import styled, { css } from 'styled-components';

import { getAppearance } from './helpers';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Container = styled.div`
  position: absolute;
  z-index: 10;
  width: ${({ width }) => width};

  padding: 0.6rem 1rem;

  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  font-size: 1.4rem;

  /* Tooltip Appearance: [dark, light] */
  ${({ theme, appearance }) => getAppearance(theme, appearance)};

  top: 100%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  ${({ top }) =>
    top &&
    css`
      bottom: 100%;
      top: auto;
    `}

  &::before,
  &::after {
    content: '';

    display: block;

    position: absolute;
    bottom: 100%;
    top: auto;
    left: ${({ arrowPositionX }) => arrowPositionX};
    z-index: -1;

    width: 0;
    height: 0;

    border-style: solid;
    background-color: transparent;
    ${({ top }) =>
      top &&
      css`
        bottom: auto;
        top: 100%;
        border-width: 5px 5px 0 5px;
      `};
  }

  &::before {
    z-index: 1;
    border-width: 0 5px 5px 5px;
    ${({ top }) =>
      top &&
      css`
        border-width: 5px 5px 0 5px;
      `};
  }

  &::after {
    z-index: -1;
    border-width: 0 6px 6px 6px;
    transform: translateX(-1px);
    ${({ top }) =>
      top &&
      css`
        border-width: 6px 6px 0 6px;
      `};
  }
`;
