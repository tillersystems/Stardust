import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

/**
 * A value is a number that can be positive, negative or neutral (0).
 *
 * @return {jsx}
 */

/* eslint-disable no-unused-vars */

const Value = ({ children, className, positive, negative }) => (
  <div className={className}>{children}</div>
);

/**
 * PropTypes Validation
 */
const { bool, node, string } = PropTypes;
Value.propTypes = {
  /** Anything that can be rendered: numbers, strings, elements or an array (or fragment) */
  children: node,

  /** className needed by styled-components */
  className: string,

  /** If the value is positive  */
  positive: bool,

  /** If the value is negative */
  negative: bool,
};

/**
 * Default props
 */
Value.defaultProps = {
  children: null,
  className: '',
  positive: false,
  negative: false,
};

export default styled(Value)`
  color: ${({ theme: { palette } }) => palette.darkBlue};

  ${({ negative }) =>
    negative &&
    css`
      color: ${({ theme: { palette } }) => palette.failure.default};
    `};

  ${({ positive }) =>
    positive &&
    css`
      color: ${({ theme: { palette } }) => palette.success.default};
    `};
`;
