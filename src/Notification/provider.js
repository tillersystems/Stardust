import React, { useReducer, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import posed, { PoseGroup } from 'react-pose';

import Container from './Container';
import notificationReducer from './reducer';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './constants';
import { getPositionAnimation } from './helpers';
import NotificationsList from './NotificationsList';

const NotificationContext = React.createContext();

/**
 * Notification Provider
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
    notificationsCount: 0,
    options: {
      autoDismiss,
      autoDismissTimeout,
      pauseOnHover,
    },
    notifications: [],
  };
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  /**
   * Add notification
   *
   * @param {function} component - Presentational component for displaying message.
   * @param {object} options - Options passed to heance notification.
   */
  const addNotification = useCallback((component, options = state.options) => {
    dispatch({ type: ADD_NOTIFICATION, component, options });
  }, []);

  /**
   * Dismiss notification
   * @param {string} key - unique key to retrieve notification.
   */
  const dismissNotification = useCallback(key => {
    dispatch({ type: REMOVE_NOTIFICATION, key });
  }, []);

  const { notifications } = state;
  return (
    <NotificationContext.Provider value={{ addNotification, dismissNotification }}>
      {children}
      <Portal>
        <NotificationsList placement={placement}>
          <PoseGroup>
            {notifications.map(({ options: notificationOptions, key, component }) => (
              <NotificationAnimation
                key={key}
                component={component}
                onDismiss={() => dismissNotification(key)}
                autoDismiss={notificationOptions.autoDismiss}
                autoDismissTimeout={notificationOptions.autoDismissTimeout}
                pauseOnHover={notificationOptions.pauseOnHover}
                placement={placement}
              />
            ))}
          </PoseGroup>
        </NotificationsList>
      </Portal>
    </NotificationContext.Provider>
  );
};

const NotificationAnimation = posed(Container)({
  enter: {
    x: ({ placement }) => getPositionAnimation(placement).enter.x,
    y: ({ placement }) => getPositionAnimation(placement).enter.y,
    transition: {
      x: { type: 'spring', stiffness: 800, damping: 50 },
      y: { type: 'spring', stiffness: 800, damping: 80 },
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
  /**
   * Whether or not to dismiss the notification automatically after a timeout
   */
  autoDismiss: bool,

  /**
   * The time until a notification is automatically dismissed, in milliseconds
   */
  autoDismissTimeout: number,

  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node,

  /**
   * Placement of the notification on the screen
   */
  placement: string,

  /**
   * Whether or not to pause the timeout when hovered
   */
  pauseOnHover: bool,
};

/**
 * Default props
 */
NotificationProvider.defaultProps = {
  autoDismiss: false,
  autoDismissTimeout: 3000,
  children: null,
  placement: 'bottom-left',
  pauseOnHover: false,
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }

  return context;
};
