import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ children, className }) => <div className={className}>{children}</div>;

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
Option.propTypes = {
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

export default Option;
