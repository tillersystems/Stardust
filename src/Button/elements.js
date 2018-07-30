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

    /* rounded Button */
    ${({ theme, rounded }) =>
      rounded &&
      css`
        border-radius: ${getRoundedRadius(0.7, theme)}rem;
      `};

    /* Tiny Button */
    ${({ tiny }) =>
      tiny &&
      css`
        padding: 0.2rem;

        ${({ theme, rounded }) =>
          rounded &&
          css`
            border-radius: ${getRoundedRadius(0.4, theme)}rem;
          `};
      `}
    /* Small Button */
    ${({ small }) =>
      small &&
      css`
        padding: 0.4rem 1.5rem;

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
        padding: 1.2rem 1.5rem;

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
        padding: 1.5rem 3rem;

        ${({ theme, rounded }) =>
          rounded &&
          css`
            border-radius: ${getRoundedRadius(1.5, theme)}rem;
          `};
      `}

    /* inverted Button */
    ${inverted =>
      inverted &&
      css`
        color: ${({ theme: { palette } }) => palette.darkGray};

        background: ${({ theme: { palette } }) => palette.white};
        border: 1px solid ${({ theme: { palette } }) => palette.gray};
      `}

    /* Primary Button */
    ${({ primary }) =>
      primary &&
      css`
        color: ${({ theme: { palette } }) => palette.primary.fore};

        background: ${({ theme: { palette } }) => palette.primary.back};
        border: 1px solid ${({ theme: { palette } }) => palette.primary.back};
      `}

    /* Primary inverted Button */
    ${({ primary, inverted }) =>
      primary &&
      inverted &&
      css`
        color: ${({ theme: { palette } }) => palette.primary.back};

        background: ${({ theme: { palette } }) => palette.primary.fore};
        border: 1px solid ${({ theme: { palette } }) => palette.primary.back};

        svg > path {
          fill: ${({ theme: { palette } }) => palette.primary.back};
        }
      `}

    /* Secondary Button */
    ${({ secondary }) =>
      secondary &&
      css`
        color: ${({ theme: { palette } }) => palette.secondary.fore};

        background: ${({ theme: { palette } }) => palette.secondary.back};
        border: 1px solid ${({ theme: { palette } }) => palette.secondary.back};
      `}

    /* Secondary inverted Button */
    ${({ secondary, inverted }) =>
      secondary &&
      inverted &&
      css`
        color: ${({ theme: { palette } }) => palette.secondary.back};

        background: ${({ theme: { palette } }) => palette.secondary.fore};
        border: 1px solid ${({ theme: { palette } }) => palette.secondary.back};

        svg > path {
          fill: ${({ theme: { palette } }) => palette.secondary.back};
        }
      `}

    /* Success Button */
    ${({ success }) =>
      success &&
      css`
        color: ${({ theme: { palette } }) => palette.success.fore};

        background: ${({ theme: { palette } }) => palette.success.back};
        border: 1px solid ${({ theme: { palette } }) => palette.success.back};
      `}

    /* Success inverted Button */
    ${({ success, inverted }) =>
      success &&
      inverted &&
      css`
        color: ${({ theme: { palette } }) => palette.success.back};

        background: ${({ theme: { palette } }) => palette.success.fore};
        border: 1px solid ${({ theme: { palette } }) => palette.success.back};

        svg > path {
          fill: ${({ theme: { palette } }) => palette.success.back};
        }
      `}

    /* Failure Button */
    ${({ failure }) =>
      failure &&
      css`
        color: ${({ theme: { palette } }) => palette.failure.fore};

        background: ${({ theme: { palette } }) => palette.failure.back};
        border: 1px solid ${({ theme: { palette } }) => palette.failure.back};
      `}

    /* Failure inverted Button */
    ${({ failure, inverted }) =>
      failure &&
      inverted &&
      css`
        color: ${({ theme: { palette } }) => palette.failure.back};

        background: ${({ theme: { palette } }) => palette.failure.fore};
        border: 1px solid ${({ theme: { palette } }) => palette.failure.back};

        svg > path {
          fill: ${({ theme: { palette } }) => palette.failure.back};
        }
      `}

    /* Light Button */
    ${({ light }) =>
      light &&
      css`
        color: ${({ theme: { palette } }) => palette.marble};

        background: ${({ theme: { palette } }) => palette.white};
        border: 1px solid ${({ theme: { palette } }) => palette.gray};

        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
      `}

    /* Light inverted Button */
    ${({ light, inverted }) =>
      light &&
      inverted &&
      css`
        background: ${({ theme: { palette } }) => palette.gray};
        border: 1px solid ${({ theme: { palette } }) => palette.gray};
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

        ${({ inverted }) =>
          inverted &&
          css`
            color: ${({ theme: { palette } }) => palette.white};

            background: ${({ theme: { palette } }) => palette.gray};
            border: 1px solid ${({ theme: { palette } }) => palette.gray};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.white};
            }
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

        ${({ primary, inverted }) =>
          primary &&
          inverted &&
          css`
            color: ${({ theme: { palette } }) => palette.primary.fore};

            background: ${({ theme: { palette } }) => palette.primary.back};
            border: 1px solid ${({ theme: { palette } }) => palette.primary.back};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.primary.fore};
            }
          `}

        ${({ secondary }) =>
          secondary &&
          css`
            color: ${({ theme: { palette } }) => palette.secondary.lightFore};

            background: ${({ theme: { palette } }) => palette.secondary.darkBack};
            border: 1px solid ${({ theme: { palette } }) => palette.secondary.darkBack};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.lightFore};
            }
          `}

        ${({ secondary, inverted }) =>
          secondary &&
          inverted &&
          css`
            color: ${({ theme: { palette } }) => palette.secondary.fore};

            background: ${({ theme: { palette } }) => palette.secondary.back};
            border: 1px solid ${({ theme: { palette } }) => palette.secondary.back};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.secondary.fore};
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

        ${({ success, inverted }) =>
          success &&
          inverted &&
          css`
            color: ${({ theme: { palette } }) => palette.success.fore};

            background: ${({ theme: { palette } }) => palette.success.back};
            border: 1px solid ${({ theme: { palette } }) => palette.success.back};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.success.fore};
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

        ${({ failure, inverted }) =>
          failure &&
          inverted &&
          css`
            color: ${({ theme: { palette } }) => palette.failure.fore};

            background: ${({ theme: { palette } }) => palette.failure.back};
            border: 1px solid ${({ theme: { palette } }) => palette.failure.back};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.failure.fore};
            }
          `}

        ${({ light }) =>
          light &&
          css`
            color: ${({ theme: { palette } }) => palette.failure.white};

            background: ${({ theme: { palette } }) => palette.bodyBackground};
            border: 1px solid ${({ theme: { palette } }) => palette.gray};

            svg > path {
              fill: ${({ theme: { palette } }) => palette.white};
            }
          `}

        ${({ light, inverted }) =>
          light &&
          inverted &&
          css`
            background: ${({ theme: { palette } }) => palette.whiteexport};
            border: 1px solid ${({ theme: { palette } }) => palette.gray};
          `}

          ${({ isGoogle }) =>
            isGoogle &&
            css`
              color: ${({ theme: { palette } }) => palette.white};
              background: ${({ theme: { palette } }) => darken(0.1, palette.googleBrandRed)};
              border: 1px solid ${({ theme: { palette } }) => palette.googleBrandRed};
            `};
    }
`;
