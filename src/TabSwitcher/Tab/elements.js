import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 3px solid ${({ theme: { palette } }) => palette.primary.default};
    `}
  color: ${({ isActive, isDisabled, theme: { palette } }) =>
    isActive ? palette.darkBlue : isDisabled ? palette.mediumGrey : palette.spaceGrey};
  ${({ isActive, isDisabled }) =>
    !isActive &&
    !isDisabled &&
    css`
      cursor: pointer;
    `}
  font-size: ${({ theme: { fonts } }) => fonts.size.h6};
  font-weight: ${({
    isActive,
    theme: {
      fonts: { weight },
    },
  }) => (isActive ? weight.thick : weight.normal)};
  margin-right: 1.5rem;
`;
