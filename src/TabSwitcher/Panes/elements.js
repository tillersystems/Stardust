import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: ${({ isCompacted }) => (isCompacted ? '1.2rem 1.6rem' : '2.4rem 3rem')};
`;
