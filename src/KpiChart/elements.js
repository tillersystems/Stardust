import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.6rem;

  padding-bottom: 0.5rem;

  border-bottom: 1px dotted ${({ theme: { palette } }) => palette.darkBlue};
`;
