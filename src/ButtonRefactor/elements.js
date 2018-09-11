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
const getRoundedRadius = (padding, theme) => 0.1 + padding + theme.fonts.size.mediumInt / 2;

export const Container = styled.button`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: ${({ marginLeft, theme }) => getMargin(marginLeft, theme)};
    margin-bottom: ${({ marginBottom, theme }) => getMargin(marginBottom, theme)};
    padding: 0.7rem 1.4rem;
    border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

    font-size: calc(${({
      theme: {
        fonts: { size },
      },
    }) => size.mediumInt}rem + 0.2rem);
    line-height: calc(${({
      theme: {
        fonts: { size },
      },
    }) => size.mediumInt}rem + 0.2rem);
    color: ${({ theme: { palette } }) => palette.white};

    background: ${({ theme: { palette } }) => palette.backgroundColor};
    border: 1px solid ${({ theme: { palette } }) => palette.backgroundColor};

    transition: background 200ms ease;

    cursor: pointer;
    outline: none;

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

        ${({ theme, rounded }) =>
          rounded &&
          css`
            border-radius: ${getRoundedRadius(0.4, theme)}rem;
          `};
      `}

    /* Medium Button */
    ${({ medium }) =>
      medium &&
      css`
        padding: 0.8rem 1.6rem;

        ${({ theme, rounded }) =>
          rounded &&
          css`
            border-radius: ${getRoundedRadius(0.4, theme)}rem;
          `};
      `}

    /* Big Button */
    ${({ big }) =>
      big &&
      css`
        padding: 0.8rem 1.8rem;

        ${({ theme, rounded }) =>
          rounded &&
          css`
            border-radius: ${getRoundedRadius(1.5, theme)}rem;
          `};
      `}

    /* Ghost */
    ${({ ghost }) =>
      ghost &&
      css`
        color: ${({ theme: { palette } }) => palette.anthracite};

        background: none;
        border: none;
      `}

    /* Primary Button */
    ${({ primary }) =>
      primary &&
      css`
        color: ${({ theme: { palette } }) => palette.primary.fore};

        background: ${({ theme: { palette } }) => palette.primary.back};
        border: 1px solid ${({ theme: { palette } }) => palette.primary.back};
      `}

    /* Success Button */
    ${({ success }) =>
      success &&
      css`
        color: ${({ theme: { palette } }) => palette.success.fore};

        background: ${({ theme: { palette } }) => palette.success.back};
        border: 1px solid ${({ theme: { palette } }) => palette.success.back};
      `}

    /* Failure Button */
    ${({ failure }) =>
      failure &&
      css`
        color: ${({ theme: { palette } }) => palette.failure.fore};

        background: ${({ theme: { palette } }) => palette.failure.back};
        border: 1px solid ${({ theme: { palette } }) => palette.failure.back};
      `}

    /* Light Button */
    ${({ light }) =>
      light &&
      css`
        color: ${({ theme: { palette } }) => palette.spaceGrey};

        background: ${({ theme: { palette } }) => palette.white};
        border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};

        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
      `}

    /* Google Button */
    ${({ isGoogle }) =>
      isGoogle &&
      css`
        color: ${({ theme: { palette } }) => palette.white};
        background: ${({ theme: { palette } }) => palette.googleBrandRed};
        border: 1px solid ${({ theme: { palette } }) => palette.googleBrandRed};
      `};

    /* Hovered  */
    &:hover:not([disabled]) {
        background: ${({ theme: { palette } }) => palette.darkGray};
        border: 1px solid ${({ theme: { palette } }) => palette.darkGray};

        color: ${({ theme: { palette } }) => palette.white}

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
            color: ${({ theme: { palette } }) => palette.primary.lightFore};

            background: ${({ theme: { palette } }) => palette.primary.darkBack};
            border: 1px solid ${({ theme: { palette } }) => palette.primary.darkBack};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.white};
            }
          `}

        ${({ success }) =>
          success &&
          css`
            color: ${({ theme: { palette } }) => palette.success.lightFore};

            background: ${({ theme: { palette } }) => palette.success.darkBack};
            border: 1px solid ${({ theme: { palette } }) => palette.success.darkBack};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.white};
            }
          `}

        ${({ failure }) =>
          failure &&
          css`
            color: ${({ theme: { palette } }) => palette.failure.fore};

            background: ${({ theme: { palette } }) => palette.failure.darkBack};
            border: 1px solid ${({ theme: { palette } }) => palette.failure.darkBack};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.white};
            }
          `}

        ${({ light }) =>
          light &&
          css`
            color: ${({ theme: { palette } }) => palette.spaceGrey};

            background: ${({ theme: { palette } }) => palette.white};
            border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
          `}

          ${({ isGoogle }) =>
            isGoogle &&
            css`
              color: ${({ theme: { palette } }) => palette.white};
              background: ${({ theme: { palette } }) => darken(0.1, palette.googleBrandRed)};
              border: 1px solid ${({ theme: { palette } }) => palette.googleBrandRed};
            `};
    }
    // TODO: ne pas codé les valeurs colorimétriques en dures.
    /* Activated  */
    &:active {
          ${({ primary }) =>
            primary &&
            css`
              box-shadow: inset 0 0 0 2px #1979a8;
            `}
          ${({ success }) =>
            success &&
            css`
              box-shadow: inset 0 0 0 2px #6c9e36;
            `}
          ${({ failure }) =>
            failure &&
            css`
              box-shadow: inset 0 0 0 2px #c75b50;
            `}
    }
`;
