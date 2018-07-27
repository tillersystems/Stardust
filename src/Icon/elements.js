import styled, { css, keyframes } from 'styled-components';

export const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: inline-block;
  font-size: 1rem;
  line-height: 1rem;

  ${({ spin }) =>
    spin &&
    css`
      animation: ${spinAnimation} 3s linear infinite;
    `};
`;
