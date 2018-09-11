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

  border-image-source: none;
  border-image-width: 0;

  padding: 0;

  font-size: ${({ width }) => width};
  line-height: ${({ width }) => width};

  ${({ spin }) =>
    spin &&
    css`
      animation: ${spinAnimation} 3s linear infinite;
    `};

  ${({ marginRight }) =>
    marginRight &&
    css`
      margin-right: 1rem;
    `};

  ${({ marginLeft }) =>
    marginLeft &&
    css`
      margin-left: 1rem;
    `};
`;
