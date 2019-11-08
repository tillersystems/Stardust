import styled from 'styled-components';

export const Amount = styled.td`
  color: ${({ theme: { palette } }) => palette.primary.default};
  text-align: end;
`;

export const Container = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  height: 5.2rem;
  padding: 0 2rem;

  &:not(:first-child) {
    border-top: 1px solid hsl(210, 11%, 93%);
  }
`;

export const Evolution = styled.td`
  color: ${({ evolution, theme: { palette } }) =>
    evolution > 0
      ? palette.success.default
      : evolution < 0
      ? palette.failure.default
      : palette.mediumGrey};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.normal};
  text-align: end;
`;

export const Label = styled.span`
  color: ${({ theme: { palette } }) => palette.darkBlue};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
`;
