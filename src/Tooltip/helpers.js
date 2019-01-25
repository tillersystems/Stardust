import { css } from 'styled-components';

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
    dark: css`
      color: ${palette.white};
      background: ${palette.darkBlue};
      box-shadow: none;
      &::before,
      &::after {
        border-color: ${palette.darkBlue} transparent ${palette.darkBlue} transparent;
      }
    `,
    light: css`
      color: ${palette.darkBlue};
      background: ${palette.white};
      box-shadow: 0 0 0 1px ${palette.lightGrey}, 0 2px 16px 0 rgba(0, 0, 0, 0.1);
      &::before {
        border-color: ${palette.white} transparent ${palette.white} transparent;
      }

      &::after {
        border-color: ${palette.lightGrey} transparent ${palette.lightGrey} transparent;
      }
    `,
  }[appearance];
};
