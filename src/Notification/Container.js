import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';
import { containerVariants, layoutTransition } from './animation';
import { Timer } from './helpers';

/**
 * Notification Container
 *
 * @return {jsx}
 */
const NotificationContainer = ({
  autoDismiss,
  autoDismissTimeout,
  component: Component,
  onDismiss,
  pauseOnHover,
  placement,
}) => {
  const [timer, setTimer] = useState(null);

  /**
   * Start Timer
   *
   */
  const startTimer = useCallback(() => {
    if (!autoDismiss) return;
    setTimer(new Timer(onDismiss, autoDismissTimeout));
  }, [autoDismiss, autoDismissTimeout, onDismiss]);

  /**
   * Reset current timer with new autoDismissTimeout value
   *
   */
  const resetTimer = useCallback(() => {
    timer.resetTimer(autoDismissTimeout);
  }, [autoDismissTimeout, timer]);

  /**
   * Clear Timer
   *
   */
  const clearTimer = useCallback(() => {
    timer.clear();
  }, [timer]);

  /**
   * onMouseEnter
   *
   */
  const onMouseEnter = () => {
    timer.pause();
  };

  /**
   * onMouseLeave
   *
   */
  const onMouseLeave = () => {
    timer.resume();
  };

  /**
   * useEffect
   *
   */
  useEffect(() => {
    if (!timer) startTimer();
    return () => {
      if (timer) clearTimer();
    };
  }, [timer, autoDismiss, startTimer, clearTimer]);

  /**
   * useEffect to handle Component update
   *
   */
  useEffect(() => {
    // try to add time to current timer if exists (on Component change).
    if (timer) resetTimer();
  }, [Component, resetTimer, timer]);

  const hasMouseEvents = pauseOnHover && autoDismiss;

  // NOTE: conditions here so methods can be clean
  const handleMouseEnter = hasMouseEvents ? onMouseEnter : null;
  const handleMouseLeave = hasMouseEvents ? onMouseLeave : null;

  return (
    <Container
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      custom={placement}
      layoutTransition={layoutTransition}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="notification-container"
      role="alert"
    >
      <Component onClose={onDismiss} />
    </Container>
  );
};

/**
 * PropTypes Validation
 */
const { bool, func, number, string } = PropTypes;

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
   * Whether or not to pause the timeout when hovered
   */
  pauseOnHover: bool.isRequired,

  /**
   * Placement of the notification on the screen
   */
  placement: string.isRequired,
};

NotificationContainer.displayName = 'NotificationContainer';

export default NotificationContainer;
