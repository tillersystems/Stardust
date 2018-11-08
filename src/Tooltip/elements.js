import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Container = styled.div`
  position: absolute;

  width: ${({ width }) => width};

  padding: 0.6rem 1rem;

  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  color: ${({ theme: { palette } }) => palette.white};

  background: ${({ theme: { palette } }) => palette.darkBlue};

  top: 100%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  ${({ top }) =>
    top &&
    css`
      bottom: 100%;
      top: auto;
    `} &::before {
    content: '';

    display: block;

    position: absolute;
    top: 0;
    left: ${({ arrowPositionX }) => arrowPositionX};
    z-index: -1;

    height: 0.7rem;
    width: 0.7rem;

    background: ${({ theme: { palette } }) => palette.darkBlue};
    transform: translate3d(0, -50%, 0) rotate(135deg);
    ${({ top }) =>
      top &&
      css`
        bottom: 0;
        top: auto;
        transform: translate3d(0, 50%, 0) rotate(135deg);
      `};
  }
`;
