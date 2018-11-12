import { css } from 'styled-components';

/**
 * Get Alert Position
 *
 * @param {string} position // Position of the alert on the screen.
 *
 */

export function getAlertPosition(position) {
  return {
    'top-left': css`
      left: 0;
      top: 0;
    `,
    'top-center': css`
      left: 50%;
      top: 0;
    `,
    'top-right': css`
      right: 0;
      top: 0;
    `,
    'bottom-left': css`
      left: 0;
      bottom: 0;
    `,
    'bottom-center': css`
      left: 50%;
      bottom: 0;
    `,
    'bottom-right': css`
      right: 0;
      bottom: 0;
    `,
  }[position];
}

/**
 * Get Position Animation
 *
 * @param {string} position // Position of the alert on the screen.
 *
 */
export function getPositionAnimation(position) {
  return {
    'top-left': {
      x: 0,
      y: -60,
    },
    'top-center': {
      x: '-50%',
      y: -60,
    },
    'top-right': {
      x: 0,
      y: -60,
    },
    'bottom-left': {
      x: 0,
      y: 60,
    },
    'bottom-center': {
      x: '-50%',
      y: 60,
    },
    'bottom-right': {
      x: 0,
      y: 60,
    },
  }[position];
}
