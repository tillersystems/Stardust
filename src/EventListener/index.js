import { canUseDOM, canUseEventListeners } from 'exenv';

import { useEffect } from 'react';
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
const EventListener = ({ listeners }) => {
  /**
   * useEffect
   * Removes and adds event listeners on listeners value change
   *
   */
  useEffect(() => {
    removeEventListeners(listeners);
    addEventListeners(listeners);
  }, [listeners]);

  const getTargetNode = target => {
    if (canUseDOM) {
      return global[target] || global.document.querySelector(target);
    }
  };

  const addEventListeners = (listeners = listeners) => {
    if (canUseEventListeners) {
      listeners.forEach(({ target, event, handler, options }) => {
        const node = getTargetNode(target);
        node && node.addEventListener(event, handler, options);
      });
    }
  };

  const removeEventListeners = (listeners = listeners) => {
    if (canUseEventListeners) {
      listeners.forEach(({ target, event, handler, options }) => {
        const node = getTargetNode(target);
        node && node.removeEventListener(event, handler, options);
      });
    }
  };

  return null;
};

/**
 * PropTypes Validation.
 */
const { array } = PropTypes;
EventListener.propTypes = {
  listeners: array.isRequired,
};

EventListener.displayName = 'EventListener';

export default EventListener;
