import React, { useReducer, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import posed, { PoseGroup } from 'react-pose';

import Container from './Container';
import notificationReducer from './reducer';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './constants';
import { getPositionAnimation } from './helpers';

const NotificationContext = React.createContext();

/**
 * Notification Provider
 *
 * @param {boolean} autoDismiss - Whether or not to dismiss the notification automatically after a timeout.
 * @param {number} autoDismissTimeout - The time until a notification is automaticaly dismissed, in milliseconds.
 * @param {node} children - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} placement - Placement of the notification on the screen.
 * @param {boolean} pauseOnHover - Whether or not to pause the timeout when hovered.
 *
 * @return {jsx}
 */
export const NotificationProvider = ({
  autoDismiss,
  autoDismissTimeout,
  children,
  placement,
  pauseOnHover,
}) => {
  const initialState = {
    isActive: false,
    component: null,
    options: {
      autoDismiss: autoDismiss,
      autoDismissTimeout,
      pauseOnHover: pauseOnHover,
    },
  };
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  /**
   * Add notification
   *
   * @param {function} component - Presentational component for displaying message.
   * @param {object} options - Options passed to heance notification.
   */
  const addNotification = useCallback(
    (component, options = state.options) => {
      dispatch({ type: ADD_NOTIFICATION, component, options });
    },
    [component, options],
  );

  /**
   * Dismiss notification
   */
  const dismissNotification = useCallback(() => {
    dispatch({ type: REMOVE_NOTIFICATION });
  }, []);

  const { component, isActive, onClose, options } = state;

  return (
    <NotificationContext.Provider value={{ addNotification, dismissNotification }}>
      {children}
      <Portal>
        <PoseGroup>
          {isActive && (
            <NotificationAnimation
              key="notification"
              autoDismiss={options.autoDismiss}
              autoDismissTimeout={options.autoDismissTimeout}
              component={component}
              onClose={onClose}
              onDismiss={dismissNotification}
              placement={placement}
              pauseOnHover={options.pauseOnHover}
            />
          )}
        </PoseGroup>
      </Portal>
    </NotificationContext.Provider>
  );
};

const NotificationAnimation = posed(Container)({
  enter: {
    x: ({ placement }) => getPositionAnimation(placement).enter.x,
    y: ({ placement }) => getPositionAnimation(placement).enter.y,
    transition: {
      x: { type: 'spring', stiffness: 800, damping: 80 },
      default: { duration: 250 },
    },
  },
  exit: {
    x: ({ placement }) => getPositionAnimation(placement).exit.x,
    y: ({ placement }) => getPositionAnimation(placement).exit.y,
    transition: { duration: 150 },
  },
});

/**
 * PropTypes Validation
 */
const { bool, node, number, string } = PropTypes;
NotificationProvider.propTypes = {
  autoDismiss: bool,
  autoDismissTimeout: number,
  children: node,
  placement: string,
  pauseOnHover: bool,
};

/**
 * Default props
 */
NotificationProvider.defaultProps = {
  autoDismiss: false,
  autoDismissTimeout: 3000,
  children: null,
  placement: 'bottom-right',
  pauseOnHover: false,
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }

  return context;
};
