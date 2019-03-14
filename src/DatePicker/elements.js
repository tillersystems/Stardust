import styled from 'styled-components';

export const Container = styled.div`
  &:not(:last-child) {
    margin-right: ${({ numberOfMonthsToDisplay }) =>
      numberOfMonthsToDisplay === 2 ? '2.4rem' : 0};
  }
`;
