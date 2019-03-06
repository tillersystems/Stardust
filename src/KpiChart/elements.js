import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.6rem;

  padding-bottom: 1.5rem;

  border-bottom: 3px solid ${({ theme: { palette } }) => palette.primary.default};
  display: flex;
  align-items: center;
`;
