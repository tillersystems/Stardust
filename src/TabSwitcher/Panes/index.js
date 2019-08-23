import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Panes hold the content of interactive tabs
 *
 * @return {jsx}
 */
const Panes = ({ children, className }) => <div className={className}>{children}</div>;

/**
 * PropTypes Validation
 */

const { node, string } = PropTypes;

Panes.propTypes = {
  /** Anything that can be rendered: numbers, strings, elements or an array (or fragment) */
  children: node.isRequired,

  /** className needed by styled components  */
  className: string,
};

/**
 * Default props.
 */
Panes.defaultProps = {
  className: undefined,
};

const StyledPanes = styled(Panes)`
  display: flex;

  width: 100%;
  height: 100%;
`;

StyledPanes.displayName = 'Panes';

export default StyledPanes;
