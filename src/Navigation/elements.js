import styled, { css } from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  padding: 0 3rem;
  background-color: ${({ theme: { palette } }) => palette.white};

  overflow-x: auto;

  ${({ isVertical }) =>
    isVertical &&
    css`
      padding: 0;
      flex-direction: column;
    `}
`;

export const NavItem = styled.a`
  text-align: center;
    cursor: pointer;
  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => size.big};
  border-bottom: 0.3rem solid;

  font-weight: ${({
    theme: {
      fonts: { weight },
    },
  }) => weight.normal};
  color: ${({ theme: { palette } }) => palette.spaceGrey};
  border-bottom-color: transparent;

  padding: 1.4rem 0 1.1rem 0;

  &:not(:last-child) {
    margin-right: 2rem;
  }

  ${({ isActived, isVertical }) =>
    isActived &&
    !isVertical &&
    css`
      font-weight: ${({
        theme: {
          fonts: { weight },
        },
      }) => weight.thick};
      color: ${({ theme: { palette } }) => palette.darkBlue};
      border-bottom-color: ${({ theme: { palette } }) => palette.primary.default};
    `}

  ${({ isVertical }) =>
    isVertical &&
    css`
      border-bottom: 0 solid;
      border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      text-align: left;
      padding: 0.9rem 1.6rem;
      &:not(:last-of-type) {
        margin-right: 0;
      }
    `}

  ${({ isActived, isVertical }) =>
    isActived &&
    isVertical &&
    css`
      font-weight: ${({
        theme: {
          fonts: { weight },
        },
      }) => weight.thick};
      color: ${({ theme: { palette } }) => palette.white};
      background-color: ${({ theme: { palette } }) => palette.primary.default};
    `}

  ${({ isFluid }) =>
    isFluid &&
    css`
      flex: 1 1 0;
    `}
`;
