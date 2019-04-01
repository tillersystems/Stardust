import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Loader
 *
 * This component is in charge of displaying
 * an Loader to indicate that an action is in progress
 *
 * @param {string} className // Classes needed by styled component.
 * @param {string} color // The color of the Loader.
 * @param {string} width // The width of the Loader.
 * @param {string} height // The height of the Loader.
 *
 * @return {jsx}
 */

import Theme from '../Theme';

const Loader = ({ className, color, width, height }) => (
  <svg className={className} viewBox="0 0 50 50" width={width} height={height} aria-hidden="true">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke={color}
      strokeWidth="4"
      data-testid="circleShape"
    />
  </svg>
);

/**
 * PropTypes Validation
 */
const { string } = PropTypes;
Loader.propTypes = {
  className: string,
  color: string,
  height: string,
  width: string,
};

/**
 * Default Props
 */
Loader.defaultProps = {
  className: '',
  color: Theme.palette.primary.default,
  height: '20px',
  width: '20px',
};

export default styled(Loader)`
  animation: rotate 1.4s linear infinite;
  display: block;

  & .path {
    stroke-linecap: round;
    animation: dash 1.4s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
