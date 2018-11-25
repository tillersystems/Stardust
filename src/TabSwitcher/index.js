import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const initialValue = {
  activeTabId: '',
  handleChangeTab: () => {},
};

/**
 * Defind the context api using react create context
 * factory, this factory contain the context provider and the context
 * consumer
 **/
const { Consumer, Provider } = createContext(initialValue);

const { node, string } = PropTypes;

/**
 * TabSwitcher
 *
 * This component is in charge of displaying
 * a Tab Swicther
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} defaultActiveTabId // Default active tab.
 *
 * @return {jsx}
 */

class TabSwitcher extends Component {
  /**
   * PropTypes validation
   */
  static propTypes = {
    children: node,
    defaultActiveTabId: string.isRequired,
  };

  /**
   * Default propTypes
   */
  static defaultProps = {
    children: null,
  };

  /* Internal state */
  state = {
    activeTabId: this.props.defaultActiveTabId, // eslint-disable-line react/destructuring-assignment
  };

  /**
   * Handle change tab
   *
   * @param {string} newTabId
   */
  handleChangeTab = newTabId => {
    this.setState({
      activeTabId: newTabId,
    });
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { activeTabId } = this.state;
    const { children } = this.props;

    return (
      <Provider
        value={{
          activeTabId: activeTabId,
          handleChangeTab: this.handleChangeTab,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const ContextConsumer = Consumer;
export default TabSwitcher;
