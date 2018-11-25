import React from 'react';
import PropTypes from 'prop-types';

import { ContextConsumer } from './index';
import { TabContainer } from './elements';

/**
 * Tab
 *
 * This component is in charge of displaying
 * a Tab
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} id // Tab id.
 *
 * @return {jsx}
 */

const Tab = ({ id, children }) => (
  <ContextConsumer>
    {({ activeTabId, handleChangeTab }) => {
      const isActive = activeTabId === id;
      const handleKeyPress = event => {
        if (event.key == 'Enter') {
          handleChangeTab(id);
        }
      };
      return (
        <TabContainer isActive={isActive} role="presentation">
          <div
            role="tab"
            aria-selected={isActive ? 'true' : 'false'}
            tabIndex={isActive ? '0' : '-1'}
            onKeyPress={event => handleKeyPress(event)}
            onClick={() => handleChangeTab(id)}
          >
            {children}
          </div>
        </TabContainer>
      );
    }}
  </ContextConsumer>
);

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
Tab.propTypes = {
  children: node,
  id: string.isRequired,
};

/**
 * Default props
 */
Tab.defaultProps = {
  children: null,
};

export default Tab;
