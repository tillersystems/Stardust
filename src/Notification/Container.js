import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';
import { Timer } from './helpers';

/**
 * Notification Container
 *
 * @return {jsx}
 */
const NotificationContainer = forwardRef(
  (
    { autoDismiss, autoDismissTimeout, component: Component, onDismiss, pauseOnHover, placement },
    ref,
  ) => {
    let timeout;

    /**
     * Start Timer
     *
     */
    const startTimer = () => {
      if (!autoDismiss) return;

      timeout = new Timer(onDismiss, autoDismissTimeout);
    };

    /**
     * Clear Timer
     *
     */
    const clearTimer = () => {
      if (!autoDismiss) return;

      if (timeout) timeout.clear();
    };

    /**
     * onMouseEnter
     *
     */
    const onMouseEnter = () => {
      if (timeout) timeout.pause();
    };

    /**
     * onMouseLeave
     *
     */
    const onMouseLeave = () => {
      if (timeout) timeout.resume();
    };

    /**
     * useEffect
     *
     */
    useEffect(() => {
      startTimer();
      // Specify how to clean up after this effect:
      return function cleanup() {
        clearTimer();
      };
    }, []);

    const hasMouseEvents = pauseOnHover && autoDismiss;

    // NOTE: conditions here so methods can be clean
    const handleMouseEnter = hasMouseEvents ? onMouseEnter : null;
    const handleMouseLeave = hasMouseEvents ? onMouseLeave : null;

    return (
      <Container
        position={placement}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-testid="notification-container"
        ref={ref}
      >
        <Component />
      </Container>
    );
  },
);

/**
 * PropTypes Validation
 */
const { bool, func, number, oneOf } = PropTypes;

NotificationContainer.propTypes = {
  /**
   * Whether or not to dismiss the notification automatically after a timeout
   */
  autoDismiss: bool.isRequired,

  /**
   * The time until a notification is automatically dismissed, in milliseconds
   */
  autoDismissTimeout: number.isRequired,

  /**
   * Presentational component for displaying message
   */
  component: func.isRequired,

  /**
   * Callback function to call when notification is dismissed
   */
  onDismiss: func.isRequired,

  /**
   * Placement of the notification on the screen
   */
  placement: oneOf([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]).isRequired,

  /**
   * Whether or not to pause the timeout when hovered
   */
  pauseOnHover: bool.isRequired,
};

NotificationContainer.displayName = 'NotificationContainer';

export default NotificationContainer;
