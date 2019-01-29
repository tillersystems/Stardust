import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Option = ({ children, className }) => <div className={className}>{children}</div>;

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
Option.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  value: string.isRequired,
  children: node,
  className: string,
};

/**
 * Default props
 */
Option.defaultProps = {
  children: null,
  className: '',
};

const StyledOption = styled(Option)`
  display: flex;
`;

export default StyledOption;
