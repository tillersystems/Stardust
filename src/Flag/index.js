import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';
import flags from './data';

const Flag = ({ name, size, ...rest }) => (
  <Container {...rest}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      width={size}
      height={size}
      viewBox="0 0 512 512"
      data-testid="flagSvg"
    >
      <g fill="none" fillRule="evenodd">
        {flags[name]()}
      </g>
    </svg>
  </Container>
);

/**
 * PropTypes Validation.
 */
const { string } = PropTypes;
Flag.propTypes = {
  name: string.isRequired,
  size: string,
};

/**
 * Default props.
 */
Flag.defaultProps = {
  size: '20',
};

export default Flag;
