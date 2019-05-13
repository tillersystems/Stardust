import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Tabs are links displaying the content of a pane
 *
 * @param {Array} children - Interactive links displaying tabs on click
 * @param {string} className - className needed by styled components
 *
 * @return {jsx}
 */
const Tabs = ({ children, className }) => (
  <div className={className} role="tablist">
    {children}
  </div>
);

/**
 * PropTypes Validation
 */

const { node, string } = PropTypes;

Tabs.propTypes = {
  children: node.isRequired,
  className: string,
};

/**
 * Default props.
 */
Tabs.defaultProps = {
  className: undefined,
};

const StyledTabs = styled(Tabs)`
  display: flex;

  border-bottom: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
`;

StyledTabs.displayName = 'Tabs';

export default StyledTabs;
