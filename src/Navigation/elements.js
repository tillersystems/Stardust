import styled, { css } from 'styled-components';

const TRANSITION = '0.2s ease';

export const Nav = styled.nav`
  display: flex;
  padding: 0;
  background-color: ${({ theme: { palette } }) => palette.white};

  overflow-x: auto;

  ${({ isVertical }) =>
    isVertical &&
    css`
      flex-direction: column;
    `}
`;

const ActiveItem = ({ isVertical }) =>
  isVertical
    ? css`
        color: ${({ theme: { palette } }) => palette.white};

        &,
        &:hover {
          background-color: ${({ theme: { palette } }) => palette.primary.default};
        }

        :disabled,
        :disabled:hover {
          background-color: ${({ theme: { palette } }) => palette.lightGrey};
        }
      `
    : css`
        color: ${({ theme: { palette } }) => palette.darkBlue};

        &,
        &:hover {
          border-bottom-color: ${({ theme: { palette } }) => palette.primary.default};
        }

        :disabled {
          color: ${({ theme: { palette } }) => palette.spaceGrey};
          border-bottom-color: ${({ theme: { palette } }) => palette.spaceGrey};
        }
      `;

export const Item = styled.span`
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => size.big};
  font-weight: ${({
    theme: {
      fonts: { weight },
    },
  }) => weight.normal};
  color: ${({ theme: { palette } }) => palette.spaceGrey};

  ${({ isActive, ...props }) => isActive && ActiveItem(props)}
  
  &.active {
    ${ActiveItem}
  }

  /* HORIZONTAL NAVIGATION */

  ${({ isVertical }) =>
    !isVertical &&
    css`
      border-bottom: 0.3rem solid;
      border-bottom-color: transparent;
      padding: 1.4rem 0 1.1rem 0;
      transition: border-color ${TRANSITION}, color ${TRANSITION};
      &:not(:last-child) {
        margin-right: 2rem;
      }

      :hover {
        border-bottom-color: ${({ theme: { palette } }) => palette.veryLightBlue};
      }

      :disabled {
        cursor: not-allowed;
        opacity: 0.6;
        border-bottom-color: transparent;
      }
    `}

  /* VERTICAL NAVIGATION */

  ${({ isVertical }) =>
    isVertical &&
    css`
      border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      text-align: left;
      padding: 0.9rem 1.6rem;
      transition: background-color ${TRANSITION}, color ${TRANSITION};

      :hover {
        background: ${({ theme: { palette } }) => palette.veryLightGrey};
      }

      :disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      :disabled:hover {
        background-color: transparent;
      }
    `}

  ${({ isFluid }) =>
    isFluid &&
    css`
      flex: 1 1 0;
    `}
`;
