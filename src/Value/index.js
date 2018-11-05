import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

/**
 * Value
 *
 * Defines a value component (a value can be positive, negative or neutre).
 *
 * @param {node} children - anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className - Class needed by styled component.
 * @param {string} positive - A value can be positive.
 * @param {string} negative - A value can be negative.
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
  children: node,
  className: string,
  positive: bool,
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
