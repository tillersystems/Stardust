import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Tag
 *
 * This component is in charge of displaying
 * a popover
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // className needed by styled components.
 * @param {string} color // The background color of the tag box.
 *
 * @return {jsx}
 */

const Tag = ({ children, className, color, ...rest }) => (
  <div className={className} {...rest}>
    {children}
  </div>
);

/**
 * PropTypes Validation.
 */
const { node, string } = PropTypes;
Tag.propTypes = {
  children: node,
  className: string,
  color: string,
};

/**
 * Default props.
 */
Tag.defaultProps = {
  children: null,
  className: '',
  color: '',
};

export default styled(Tag)`
  position: relative;
  display: inline-block;

  padding: 0.2rem 0.8rem 0.4rem;
  border-radius: 0.5rem;

  color: ${({ theme: { palette } }) => palette.white};
  background: ${({ color }) => color};
`;
