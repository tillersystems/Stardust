import React, { Children, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';

import Pane from './Pane';
import Panes from './Panes';
import Tab from './Tab';
import Tabs from './Tabs';

const { bool, func, node, number } = PropTypes;

/**
 * A TabSwitcher wraps all the logic between tabs (elements allowing to display content)
 * and panes (content displayable when its tab is clicked)
 *
 * @param {node} children - Tabs and Panes to be displayed.
 * @param {number} defaultIndex - Starts the tab at a specific index.
 * @param {number} index - Like form inputs, a tab's state can be controlled by the owner.
 * @param {boolean} isCompacted - If it is true, should reduce its size by reducing padding and font-size.
 * @param {function} onChange - Callback with the tab index triggered when the user changes tabs allowing your app to synchronize with it.
 *
 *
 * @return {jsx}
 */
const TabSwitcher = ({ children, defaultIndex, index, isCompacted, onChange }) => {
  const isControlled = index != null;

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const content = Children.map(children, child => {
    if (child.type.displayName === 'Panes') {
      return cloneElement(child, {
        activeIndex: isControlled ? index : activeIndex,
        isCompacted: isCompacted,
      });
    } else if (child.type.displayName === 'Tabs') {
      return cloneElement(child, {
        activeIndex: isControlled ? index : activeIndex,
        isCompacted: isCompacted,
        onActiveTab: index => {
          onChange && onChange(index);
          if (!isControlled) {
            setActiveIndex(index);
          }
        },
      });
    } else {
      return child;
    }
  });

  return <div>{content}</div>;
};

TabSwitcher.displayName = 'TabSwitcher';

TabSwitcher.Pane = Pane;
TabSwitcher.Panes = Panes;
TabSwitcher.Tab = Tab;
TabSwitcher.Tabs = Tabs;

TabSwitcher.propTypes = {
  children: node.isRequired,
  defaultIndex: number,
  isCompacted: bool,
  onChange: func,
  index: (props, name, compName, ...rest) => {
    if (props.index > -1 && props.onChange == null) {
      return new Error(
        'You provided an `index` prop to `TabSwitcher` without an `onChange` handler. This will render a read-only tabs element. If the tabs should be mutable use `defaultIndex`. Otherwise, set `onChange`.',
      );
    } else {
      return number(name, props, compName, ...rest);
    }
  },
};

TabSwitcher.defaultProps = {
  defaultIndex: 0,
  index: undefined,
  isCompacted: false,
  onChange: undefined,
};

export default TabSwitcher;
