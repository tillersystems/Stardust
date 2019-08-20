import React from 'react';
import PropTypes from 'prop-types';

/**
 * Check Circle Icon comnponent
 *
 * @return {jsx}
 */
const CheckCircle = ({ fill }) => {
  return (
    <>
      <defs>
        <path
          d="M351.5 41.7a21.3 21.3 0 0 1-17.4 39A192 192 0 1 0 448 256v-19.6a21.3 21.3 0 0 1 42.7 0v19.6A234.7 234.7 0 1 1 351.5 41.7zm133 28.7a21.3 21.3 0 0 1 0 30.1L271 314.1a21.3 21.3 0 0 1-30.2 0l-64-64a21.3 21.3 0 1 1 30.2-30.2l48.9 49L454.2 70.3a21.3 21.3 0 0 1 30.2 0z"
          id="circle"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="check" fill="#fff" fillOpacity="0">
          <use xlinkHref="#circle" />
        </mask>
        <use fill={fill} fillRule="nonzero" xlinkHref="#circle" />
        <g mask="url(#check)" fill={fill}>
          <path d="M0 0h512v512H0z" />
        </g>
      </g>
    </>
  );
};

/**
 * PropTypes Validation
 */
const { string } = PropTypes;

CheckCircle.propTypes = {
  /**
   * Fill color
   */
  fill: string,
};

/**
 * Default props.
 */
CheckCircle.defaultProps = {
  fill: 'white',
};

/**
 * Display name
 */
CheckCircle.displayName = 'CheckCircle';

export default CheckCircle;
