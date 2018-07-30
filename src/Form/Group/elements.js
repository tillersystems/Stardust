import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  ${({ row }) =>
    row &&
    css`
      flex-direction: row;
    `};
`;
