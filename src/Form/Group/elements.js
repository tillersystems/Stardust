import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 0;

  ${({ row }) =>
    row &&
    css`
      margin-top: 1.6rem;
      flex-direction: row;
      &:first-child {
        margin-top: 0;
      }
    `};
`;
