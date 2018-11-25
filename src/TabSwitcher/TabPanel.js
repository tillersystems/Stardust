import React from 'react';
import PropTypes from 'prop-types';

import { ContextConsumer } from './index';

/**
 * TabPanel
 *
 * This component is in charge of displaying
 * a Tab panel
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} whenActive // Indicate wich panel is active.
 *
 * @return {jsx}
 */

const TabPanel = ({ children, whenActive }) => (
  <ContextConsumer>
    {({ activeTabId }) =>
      activeTabId === whenActive ? (
        <section aria-labelledby={whenActive} tabIndex="0" role="tabpanel">
          {children}
        </section>
      ) : null
    }
  </ContextConsumer>
);

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
TabPanel.propTypes = {
  children: node,
  whenActive: string.isRequired,
};

/**
 * Default props
 */
TabPanel.defaultProps = {
  children: null,
};

export default TabPanel;
