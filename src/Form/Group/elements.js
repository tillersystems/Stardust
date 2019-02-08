import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:first-child) {
    ${({ row }) => (row ? `margin-top: 1rem;` : `margin-top: 0.7rem;`)}
  }

  ${({ row }) => row && `flex-direction: row;`};
`;
