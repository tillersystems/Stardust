import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 0;

  ${({ row }) =>
    row &&
    css`
      &:not(:first-child) {
        margin-top: ${({ theme: { dimensions } }) => dimensions.medium};
      }
      flex-direction: row;
    `};
`;
