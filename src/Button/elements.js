import styled, { css } from 'styled-components';
import { darken } from 'polished';

/**
 * Gets the margin of the button.
 *
 * @param {String} margin - The given margin.
 * @param {Object} theme - The theme.
 *
 * @return {String}
 */
const getMargin = (margin, theme) => {
  if (!margin) {
    return '0';
  } else {
    if (theme.dimensions[margin]) {
      return theme.dimensions[margin];
    } else {
      return margin;
    }
  }
};

/**
 * Gets the radius for rounded buttons.
 *
 * @param {Number} padding - The padding.
 * @param {Object} theme - The theme.
 */

export const ContainerIconRight = styled.span`
  margin-left: 1rem;
`;

export const ContainerIconLeft = styled.span`
  margin-right: 1rem;
`;

export const Container = styled.button`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: ${({ marginLeft, theme }) => getMargin(marginLeft, theme)};
    margin-bottom: ${({ marginBottom, theme }) => getMargin(marginBottom, theme)};
    padding: 0.8rem 1.6rem;
    border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

    font-size: ${({
      theme: {
        fonts: { size },
      },
    }) => size.medium};
    line-height: ${({
      theme: {
        fonts: { size },
      },
    }) => size.medium};
      font-weight: ${({ theme: { fonts } }) => fonts.weight.normal};

    color: ${({ theme: { palette } }) => palette.white};

    transition: background 200ms ease, box-shadow 200ms ease;

    cursor: pointer;
    outline: none;

    svg > path {
      fill: ${({ theme: { palette } }) => palette.white};
    }

    /* Disabled */
    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
        opacity: 0.4;
      `}

    /* Fluid Button */
    ${({ fluid }) =>
      fluid &&
      css`
        width: 100%;
      `}

    /* Small Button */
    ${({ small }) =>
      small &&
      css`
        padding: 0.4rem 0.8rem;
      `}

    /* Big Button */
    ${({ big }) =>
      big &&
      css`
        padding: 0.8rem 1.8rem;
        font-size: ${({
          theme: {
            fonts: { size },
          },
        }) => size.big};
        line-height: ${({
          theme: {
            fonts: { size },
          },
        }) => size.big};
      `}

    /* Ghost */
    ${({ ghost }) =>
      ghost &&
      css`
        color: ${({ theme: { palette } }) => palette.darkBlue};
        background: none;
        border: none;
        svg > path {
          fill: ${({ theme: { palette } }) => palette.darkBlue};
        }
      `}

    /* Primary Button */
    ${({ primary }) =>
      primary &&
      css`
        color: ${({ theme: { palette } }) => palette.white};
        background: ${({ theme: { palette } }) => palette.primary.default}
          linear-gradient(
            0deg,
            ${({ theme: { palette } }) => palette.whiteOpacity(0)} 0%,
            ${({ theme: { palette } }) => palette.whiteOpacity(0.1)} 100%
          );
        border: 1px solid ${({ theme: { palette } }) => palette.primary.dark};
        box-shadow: inset 0 0.2rem 0 0 ${({ theme: { palette } }) => palette.whiteOpacity(0.1)};
      `}

    /* Success Button */
    ${({ success }) =>
      success &&
      css`
        color: ${({ theme: { palette } }) => palette.white};
        background: ${({ theme: { palette } }) => palette.success.default}
          linear-gradient(
            0deg,
            ${({ theme: { palette } }) => palette.whiteOpacity(0)} 0%,
            ${({ theme: { palette } }) => palette.whiteOpacity(0.1)} 100%
          );
        border: 1px solid ${({ theme: { palette } }) => palette.success.dark};
        box-shadow: inset 0 0.2rem 0 0 ${({ theme: { palette } }) => palette.whiteOpacity(0.1)};
      `}

    /* Failure Button */
    ${({ failure }) =>
      failure &&
      css`
        color: ${({ theme: { palette } }) => palette.white};
        background: ${({ theme: { palette } }) => palette.failure.default}
          linear-gradient(
            0deg,
            ${({ theme: { palette } }) => palette.whiteOpacity(0)} 0%,
            ${({ theme: { palette } }) => palette.whiteOpacity(0.1)} 100%
          );
        border: 1px solid ${({ theme: { palette } }) => palette.failure.dark};
        box-shadow: inset 0 0.2rem 0 0 ${({ theme: { palette } }) => palette.whiteOpacity(0.1)};
      `}

    /* Secondary Button */
    ${({ secondary }) =>
      secondary &&
      css`
        color: ${({ theme: { palette } }) => palette.spaceGrey};
        background: linear-gradient(
          180deg,
          ${({ theme: { palette } }) => palette.white} 0%,
          ${({ theme: { palette } }) => palette.mysticGrey} 100%
        );
        border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
        svg > path {
          fill: ${({ theme: { palette } }) => palette.spaceGrey};
        }
      `}

    /* Google Button */
    ${({ isGoogle }) =>
      isGoogle &&
      css`
        color: ${({ theme: { palette } }) => palette.white};
        background: ${({ theme: { palette } }) => palette.googleBrandRed};
        border: 0.1rem solid ${({ theme: { palette } }) => palette.googleBrandRed};
        box-shadow: inset 0 0.2rem 0 0 ${({ theme: { palette } }) => palette.whiteOpacity(0.1)};
      `};

    /* Hovered  */
    &:hover:not([disabled]):not(:active) {

        ${({ ghost }) =>
          ghost &&
          css`
            color: current;
            background: none;
            border: none;
          `}

          ${({ primary }) =>
            primary &&
            css`
              background: ${({ theme: { palette } }) => palette.primary.default};
              box-shadow: none;
            `}

          ${({ success }) =>
            success &&
            css`
              background: ${({ theme: { palette } }) => palette.success.default};
              box-shadow: none;
            `}

          ${({ failure }) =>
            failure &&
            css`
              background: ${({ theme: { palette } }) => palette.failure.default};
              box-shadow: none;
            `}

        ${({ isGoogle }) =>
          isGoogle &&
          css`
            background: ${({ theme: { palette } }) => darken(0.1, palette.googleBrandRed)};
          `};
    }
    /* Activated  */
    &:active {
          ${({ primary }) =>
            primary &&
            css`
              background-color: ${({ theme: { palette } }) => palette.primary.dark};
              border: 1px solid ${({ theme: { palette } }) => palette.primary.darker};
              box-shadow: inset 0 0 0 0.1rem ${({ theme: { palette } }) => palette.primary.darker};
            `}
          ${({ success }) =>
            success &&
            css`
              background-color: ${({ theme: { palette } }) => palette.success.dark};
              border: 1px solid ${({ theme: { palette } }) => palette.success.darker};
              box-shadow: inset 0 0 0 0.1rem ${({ theme: { palette } }) => palette.success.darker};
            `}
          ${({ failure }) =>
            failure &&
            css`
              background-color: ${({ theme: { palette } }) => palette.failure.dark};
              border: 1px solid ${({ theme: { palette } }) => palette.failure.darker};
              box-shadow: inset 0 0 0 0.1rem ${({ theme: { palette } }) => palette.failure.darker};
            `}
    }
`;
