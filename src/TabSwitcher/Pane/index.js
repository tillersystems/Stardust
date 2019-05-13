import React, { memo, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { context } from '..';

/**
 * A pane wraps the content displayable by a tab
 *
 * @param {node} children - Anything that can be rendered: numbers, strings, elements or an array (or fragment)
 * @param {string} className - className needed by styled components
 * @param {string} tabId - Tab id
 *
 * @return {jsx}
 */

const Pane = forwardRef(({ children, className, tabId }, ref) => {
  const { activeTabId } = useContext(context);

  return tabId !== activeTabId ? null : (
    <div
      className={className}
      ref={ref}
      aria-labelledby={tabId}
      id={`panel:${tabId}`}
      tabIndex="0"
      role="tabpanel"
    >
      {children}
    </div>
  );
});

/**
 * PropTypes Validation
 */

const { node, string } = PropTypes;

Pane.propTypes = {
  children: node,
  className: string,
  tabId: string.isRequired,
};

/**
 * Default props.
 */
Pane.defaultProps = {
  children: null,
  className: undefined,
};

Pane.displayName = 'Pane';

const StyledPane = styled(memo(Pane))`
  width: 100%;
  height: 100%;
`;

StyledPane.displayName = 'Pane';

export default StyledPane;
