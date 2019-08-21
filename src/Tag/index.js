import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * A Tag categorizes or marks anything.
 *
 * @return {jsx}
 */

const Tag = ({ children, className, color, ...rest }) => (
  <div className={className} {...rest} data-testid="tag">
    {children}
  </div>
);

/**
 * PropTypes Validation.
 */
const { node, string } = PropTypes;
Tag.propTypes = {
  /** Anything that can be rendered: numbers, strings, elements or an array (or fragment) */
  children: node,

  /** className needed by styled-components */
  className: string,

  /** The background color of the tag box */
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
