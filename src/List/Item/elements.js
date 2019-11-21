import styled from 'styled-components';

export const Amount = styled.div`
  color: ${({ theme: { palette } }) => palette.primary.default};
  text-align: end;
`;

export const Container = styled.li`
  align-items: center;
  background-color: white;
  display: flex;
  height: 5.2rem;
  justify-content: space-between;
  padding: 0 2rem;

  &:not(:first-child) {
    border-top: 1px solid ${({ theme: { palette } }) => palette.mysticGrey};
  }
`;

export const Evolution = styled.div`
  color: ${({ evolution, theme: { palette } }) =>
    evolution > 0
      ? palette.success.default
      : evolution < 0
      ? palette.failure.default
      : palette.mediumGrey};
  font-size: ${({ theme: { fonts } }) => fonts.size.default};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.normal};
  text-align: end;
`;

export const Label = styled.span`
  color: ${({ theme: { palette } }) => palette.darkBlue};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
`;

export const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
