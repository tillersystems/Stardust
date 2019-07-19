import { css } from 'styled-components';

/**
 * Get Alert Position
 *
 * @param {string} placement - Placement of the notification on the screen.
 *
 * @return {array}
 */

export function getNotificationPosition(placement) {
  return {
    'top-left': css`
      left: 0;
      top: 4rem;
    `,
    'top-center': css`
      left: 50%;
      top: 0;
    `,
    'top-right': css`
      right: 0;
      top: 4rem;
    `,
    'bottom-left': css`
      left: 0;
      bottom: 4rem;
    `,
    'bottom-center': css`
      left: 50%;
      bottom: 0;
    `,
    'bottom-right': css`
      right: 0;
      bottom: 4rem;
    `,
  }[placement];
}

/**
 * Get Position Animation
 *
 * @param {string} placement - Placement of the notification on the screen.
 *
 * @return {object}
 */
export function getPositionAnimation(placement) {
  return {
    'top-left': {
      enter: {
        x: '0%',
        y: '0%',
      },
      exit: {
        x: '-100%',
        y: '0%',
      },
    },
    'top-center': {
      enter: {
        x: '-50%',
        y: '0%',
      },
      exit: {
        x: '-50%',
        y: '-100%',
      },
    },
    'top-right': {
      enter: {
        x: '0%',
        y: '0%',
      },
      exit: {
        x: '100%',
        y: '0%',
      },
    },
    'bottom-left': {
      enter: {
        x: '0%',
        y: '0%',
      },
      exit: {
        x: '-100%',
        y: '0%',
      },
    },
    'bottom-center': {
      enter: {
        x: '-50%',
        y: '0%',
      },
      exit: {
        x: '-50%',
        y: '100%',
      },
    },
    'bottom-right': {
      enter: {
        x: '0%',
        y: '0%',
      },
      exit: {
        x: '100%',
        y: '0%',
      },
    },
  }[placement];
}

/**
 * Timer
 *
 * @param {function} callback - Callback called when timer is done.
 * @param {number} delay - The delay of the timer.
 *
 * @return {jsx}
 */
export function Timer(callback, delay) {
  let timer = delay;
  let start = delay;
  let remaining = delay;

  this.clear = () => clearTimeout(timer);

  this.pause = () => {
    clearTimeout(timer);
    remaining -= Date.now() - start;
  };

  this.resume = () => {
    start = Date.now();
    clearTimeout(timer);
    timer = setTimeout(callback, remaining);
  };

  this.resume();
}
