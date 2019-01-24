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
      &::before {
        background: ${palette.darkBlue};
      }
    `,
    light: css`
      color: ${palette.darkBlue};
      background: ${palette.white};
      box-shadow: 0 0 0 1px ${palette.lightGrey}, 0 2px 16px 0 rgba(0, 0, 0, 0.1);
      &::before {
        background: ${palette.white};
      }
    `,
  }[appearance];
};
