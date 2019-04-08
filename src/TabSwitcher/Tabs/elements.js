import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  padding: ${({ isCompacted }) => (isCompacted ? '1.4rem 1.6rem 0 1.6rem' : '2.4rem 3rem 0 3rem')};
`;
