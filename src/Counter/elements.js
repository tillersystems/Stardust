import styled from 'styled-components';

export const FakeInput = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ width }) => width};

  background: ${({ theme: { palette } }) => palette.white};
  border-top: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.lightGrey};

  color: ${({ theme: { palette } }) => palette.darkBlue};
`;
