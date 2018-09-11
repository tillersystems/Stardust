import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Theme from '../Theme';
import { Container } from './elements';
import { Data } from './data';

const { palette } = Theme;
const getColor = color => {
  if (palette.hasOwnProperty(color)) return palette[color];
  return color;
};

const Icon = ({ name, color, height, width, spin, marginRight, marginLeft }) => (
  <Container {...{ spin, width, height, marginRight, marginLeft }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <path fill={getColor(color)} fillRule="evenodd" d={Data[name]} />
    </svg>
  </Container>
);

/**
 * PropTypes Validation.
 */
const { string, bool } = PropTypes;
Icon.propTypes = {
  name: string.isRequired,
  color: string,
  height: string,
  width: string,
  spin: bool,
  marginRight: bool,
  marginLeft: bool,
};

/**
 * Default props.
 */
Icon.defaultProps = {
  color: 'white',
  height: '20',
  width: '20',
  spin: false,
  marginLeft: false,
  marginRight: false,
};

export default styled(Icon)``;
