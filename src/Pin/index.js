import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Defines a pin component (a little round with color).
 *
 * @param {string} width - The width of the pin.
 * @param {string} height - The height of the pin.
 * @param {string} color - The color of the pin.
 *
 * @return {jsx}
 */
const Pin = ({ className }) => <div className={className} />;

/** Prop types. */
const { string } = PropTypes;
/* eslint-disable react/no-unused-prop-types */
Pin.propTypes = {
  className: string,
  width: string,
  height: string,
  color: string.isRequired,
};

/** Default props. */
Pin.defaultProps = {
  className: '',
  width: '1rem',
  height: '1rem',
};

const styledPin = styled(Pin)`
  width: ${({ width }) => width || '1rem'};
  height: ${({ height }) => height || '1rem'};

  border-radius: 50%;

  background: ${({ color }) => color};
`;
styledPin.displayName = 'Pin';

export default styledPin;
