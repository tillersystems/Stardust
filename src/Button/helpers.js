import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * getAppearance
 *
 * Helper function to render the right css
 * compared to the appearance given to it.
 *
 * @param {object} palette // The color's pallete of the theme.
 * @param {string} appearance // The button appearance.
 */

export const getAppearance = ({ palette }, appearance) => {
  return {
    default: css`
      color: ${palette.darkBlue};
      background: none;
      svg > path {
        fill: ${palette.darkBlue};
      }
    `,
    primary: css`
      background: ${palette.primary.default}
        linear-gradient(
          0deg,
          ${({ theme: { palette } }) => palette.whiteOpacity(0)} 0%,
          ${({ theme: { palette } }) => palette.whiteOpacity(0.1)} 100%
        );
      border: 1px solid ${palette.primary.dark};
      box-shadow: inset 0 0.2rem 0 0 ${palette.whiteOpacity(0.1)};

      /* Hovered  */
      &:hover:not([disabled]):not(:active) {
        background: ${palette.primary.default};
        box-shadow: none;
      }

      /* Activated  */
      &:active {
        background-color: ${palette.primary.dark};
        border: 1px solid ${palette.primary.darker};
        box-shadow: inset 0 0 0 0.1rem ${palette.primary.darker};
      }
    `,
    secondary: css`
      color: ${palette.spaceGrey};
      background: linear-gradient(180deg, ${palette.white} 0%, ${palette.mysticGrey} 100%);
      border: 1px solid ${palette.lightGrey};
      svg > path {
        fill: ${palette.spaceGrey};
      }
    `,
    success: css`
      background: ${palette.success.default}
        linear-gradient(0deg, ${palette.whiteOpacity(0)} 0%, ${palette.whiteOpacity(0.1)} 100%);
      border: 1px solid ${palette.success.dark};
      box-shadow: inset 0 0.2rem 0 0 ${palette.whiteOpacity(0.1)};

      /* Hovered  */
      &:hover:not([disabled]):not(:active) {
        background: ${palette.success.default};
        box-shadow: none;
      }

      /* Activated  */
      &:active {
        background-color: ${palette.success.dark};
        border: 1px solid ${palette.success.darker};
        box-shadow: inset 0 0 0 0.1rem ${palette.success.darker};
      }
    `,
    failure: css`
      background: ${palette.failure.default}
        linear-gradient(0deg, ${palette.whiteOpacity(0)} 0%, ${palette.whiteOpacity(0.1)} 100%);
      border: 1px solid ${palette.failure.dark};
      box-shadow: inset 0 0.2rem 0 0 ${palette.whiteOpacity(0.1)};

      /* Hovered  */
      &:hover:not([disabled]):not(:active) {
        background: ${palette.failure.default};
        box-shadow: none;
      }

      /* Activated  */
      &:active {
        background-color: ${palette.failure.dark};
        border: 1px solid ${palette.failure.darker};
        box-shadow: inset 0 0 0 0.1rem ${palette.failure.darker};
      }
    `,
    google: css`
      background: ${palette.googleBrandRed};
      border: 0.1rem solid ${palette.googleBrandRed};
      box-shadow: inset 0 0.2rem 0 0 ${palette.whiteOpacity(0.1)};

      /* Hovered  */
      &:hover:not([disabled]):not(:active) {
        background: ${darken(0.1, palette.googleBrandRed)};
      }
    `,
  }[appearance];
};

/**
 * getSize
 *
 * Helper function to render the right css
 * compared to the size given to him.
 *
 * @param {object} fonts // The font theme.
 * @param {string} size // The button size.
 */

export const getSize = ({ fonts }, size, icon) => {
  return {
    small: css`
      padding: ${!icon ? '0.35rem 1.4rem' : '0.35rem 1.6rem 0.35rem 0.9rem'};
    `,
    default: css`
      padding: ${!icon ? '0.75rem 2.2rem' : '0.75rem 2.4rem 0.75rem 1.4rem'};
    `,
    large: css`
      padding: ${!icon ? '0.7rem 2.4rem' : '0.7rem 2.4rem 0.7rem 1.8rem'};
      font-size: ${fonts.size.big};
      line-height: 1.5;
    `,
  }[size];
};
