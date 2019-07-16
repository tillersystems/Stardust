import { PureComponent } from 'react';
import { canUseDOM, canUseEventListeners } from 'exenv';

import PropTypes from 'prop-types';

/**
 * Components can delegates to EventListener the listening of specific elements
 * and trigger callback if the specified events have been triggered to these elements
 * Comes handy to handle outside clicks for example.
 *
 * @param {Array} listeners - array of object { target: string, event: string, handler: fn, options: boolean }
 * e.g. { target: 'document', event: 'click', handler: () => { ... },  options: true }
 *
 * @return null
 */
class EventListener extends PureComponent {
  /**
   * componentDidMount - lifeycle method
   * Adds event listeners on mount
   *
   */
  componentDidMount() {
    const { listeners } = this.props;
    this.addEventListeners(listeners);
  }

  /**
   * componentDidUpdate - lifeycle method
   * Update event listeners
   *
   */
  componentDidUpdate(prevProps) {
    const { listeners } = this.props;
    this.removeEventListeners(prevProps.listeners);
    this.addEventListeners(listeners);
  }

  /**
   * componentWillUnmount - lifeycle method
   * Update event listeners
   *
   */
  componentWillUnmount() {
    const { listeners } = this.props;
    this.removeEventListeners(listeners);
  }

  getTargetNode = target => {
    if (canUseDOM) {
      return global[target] || global.document.querySelector(target);
    }
  };

  addEventListeners = listeners => {
    if (canUseEventListeners) {
      listeners.forEach(({ target, event, handler, options }) => {
        const node = this.getTargetNode(target);
        node && node.addEventListener(event, handler, options);
      });
    }
  };

  removeEventListeners = listeners => {
    if (canUseEventListeners) {
      listeners.forEach(({ target, event, handler, options }) => {
        const node = this.getTargetNode(target);
        node && node.removeEventListener(event, handler, options);
      });
    }
  };

  render() {
    return null;
  }
}

/**
 * PropTypes Validation.
 */
const { array } = PropTypes;
EventListener.propTypes = {
  listeners: array.isRequired,
};

EventListener.displayName = 'EventListener';

export default EventListener;
