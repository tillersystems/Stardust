import styled, { css } from 'styled-components';

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
  color: ${({ invertColor, theme: { palette } }) =>
    invertColor ? palette.darkBlue : palette.white};

  background: ${({ invertColor, theme: { palette } }) =>
    invertColor ? palette.white : palette.darkBlue};
  box-shadow: ${({ invertColor, theme: { palette } }) =>
    invertColor ? `0 0 0 1px ${palette.lightGrey}, 0 2px 16px 0 rgba(0, 0, 0, 0.1);` : `none`};

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

    background: ${({ invertColor, theme: { palette } }) =>
      invertColor ? palette.white : palette.darkBlue};
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
