import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.6rem;

  padding-bottom: 0.5rem;

  border-bottom: 1px dotted ${({ theme: { palette } }) => palette.darkBlue};
`;

export const Body = styled.div`
  height: 37.3rem;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1rem;

  button {
    color: ${({ theme: { palette } }) => palette.primary.default};
  }
`;
