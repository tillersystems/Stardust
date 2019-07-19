import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';
import { Timer } from './helpers';

/**
 * Notification Container
 *
 * @param {boolean} autoDismiss - Whether or not to dismiss the notification automatically after a timeout.
 * @param {number} autoDismissTimeout - The time until a notification is automaticaly dismissed, in milliseconds.
 * @param {function} component - Presentational component for displaying message.
 * @param {function} onDismiss - Callback function to call when notification is dismissed.
 * @param {function} pauseOnHover - Whether or not to pause the timeout when hovered.
 * @param {string} placement - Placement of the notification on the screen.
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
  autoDismiss: bool.isRequired,
  autoDismissTimeout: number.isRequired,
  component: func.isRequired,
  onDismiss: func.isRequired,
  placement: oneOf([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]).isRequired,
  pauseOnHover: bool.isRequired,
};

NotificationContainer.displayName = 'NotificationContainer';

export default NotificationContainer;
