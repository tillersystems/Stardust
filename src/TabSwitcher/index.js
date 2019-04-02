import React, { Children, cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Pane from './Pane';
import Panes from './Panes';
import Tab from './Tab';
import Tabs from './Tabs';

const { func, node, number } = PropTypes;

/**
 * A TabSwitcher wraps all the logic between tabs (elements allowing to display content)
 * and panes (content displayable when its tab is clicked)
 *
 * @return {jsx}
 */
class TabSwitcher extends PureComponent {
  static Pane = Pane;
  static Panes = Panes;
  static Tab = Tab;
  static Tabs = Tabs;

  /** Prop types. */
  static propTypes = {
    activeIndex: number,
    children: node,
    onActiveTabChange: func,
  };

  /** Default props. */
  static defaultProps = {
    activeIndex: null,
    children: null,
    onActiveTabChange: () => {},
  };

  /** Internal state. */
  state = {
    activeIndex: 0,
  };

  /**
   * Component lifecycle method
   * Set activeIndex if provided by parent
   *
   */
  componentDidMount() {
    const { activeIndex } = this.props;
    activeIndex !== null && this.setState({ activeIndex });
  }

  /**
   * Callback that sets the active index when a tab is clicked.
   * Allows the component to display the proper pane.
   * If provided, triggers a callback for the parent component
   */
  onActiveTab = activeIndex => {
    const { onActiveTabChange } = this.props;

    this.setState({ activeIndex }, () => {
      onActiveTabChange(activeIndex);
    });
  };

  render() {
    const { children } = this.props;
    const { activeIndex } = this.state;

    const content = Children.map(children, child => {
      if (child.type.displayName === 'Panes') {
        return cloneElement(child, {
          activeIndex: activeIndex,
        });
      } else if (child.type.displayName === 'Tabs') {
        return cloneElement(child, {
          activeIndex: activeIndex,
          onActiveTab: this.onActiveTab,
        });
      } else {
        return child;
      }
    });

    return <div>{content}</div>;
  }
}

export default TabSwitcher;
