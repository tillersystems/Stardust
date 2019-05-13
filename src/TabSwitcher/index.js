import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import Pane from './Pane';
import Panes from './Panes';
import Tab from './Tab';
import Tabs from './Tabs';

export const context = createContext({});
const { Provider } = context;

/**
 * A TabSwitcher wraps all the logic between tabs (elements allowing to display content)
 * and panes (content displayable when its tab is clicked)
 *
 * @param {node} children - Tabs and Panes to be displayed.
 * @param {number} defaultTabId - Starts the tab at a specific id.
 * @param {number} tabId - Like form inputs, a tab's state can be controlled by the owner.
 * @param {function} onChange - Callback with the tab id triggered when the user changes tabs allowing your app to synchronize with it.
 *
 *
 * @return {jsx}
 */
const TabSwitcher = ({ children, defaultTabId, tabId, onChange }) => {
  const isControlled = tabId != null;

  const [activeTabId, setActiveTabId] = useState(defaultTabId);

  return (
    <Provider
      value={{
        activeTabId: isControlled ? tabId : activeTabId,
        onTabChange: id => {
          onChange && onChange(id);
          if (!isControlled) {
            setActiveTabId(id);
          }
        },
      }}
    >
      {children}
    </Provider>
  );
};

TabSwitcher.displayName = 'TabSwitcher';

TabSwitcher.Pane = Pane;
TabSwitcher.Panes = Panes;
TabSwitcher.Tab = Tab;
TabSwitcher.Tabs = Tabs;

/**
 * PropTypes Validation
 */

const { func, node, string } = PropTypes;

TabSwitcher.propTypes = {
  children: node.isRequired,
  defaultTabId: string,
  onChange: func,
  tabId: (props, name, compName, ...rest) => {
    if (props.tabId != null && props.onChange == null) {
      return new Error(
        'You provided an `tabId` prop to `TabSwitcher` without an `onChange` handler. This will render a read-only tabs element. If the tabs should be mutable use `defaultTabId`. Otherwise, set `onChange`.',
      );
    } else {
      return string(name, props, compName, ...rest);
    }
  },
};

/**
 * Default props.
 */
TabSwitcher.defaultProps = {
  defaultTabId: undefined,
  tabId: undefined,
  onChange: undefined,
};

export default TabSwitcher;
