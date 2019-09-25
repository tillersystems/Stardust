import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, UPDATE_NOTIFICATION } from './constants';
/**
 * Notification Reducer
 *
 * @param {function} state - Previous state
 * @param {function} action - Current action.
 *
 * @return {object} - New state
 */

const notificationReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notificationsCount: state.notificationsCount + 1,
        notifications: [
          ...state.notifications,
          {
            component: action.component,
            key: action.options.key || `notif-component-${state.notificationsCount}`,
            options: {
              autoDismiss: action.options.autoDismiss || state.options.autoDismiss,
              autoDismissTimeout:
                action.options.autoDismissTimeout || state.options.autoDismissTimeout,
              pauseOnHover: action.options.pauseOnHover || state.options.pauseOnHover,
            },
          },
        ],
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.key !== action.key),
      };

    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map(notification => {
          if (notification.key === action.options.key) {
            return {
              ...notification,
              component: action.component,
              options: {
                autoDismiss: action.options.autoDismiss || state.options.autoDismiss,
                autoDismissTimeout:
                  action.options.autoDismissTimeout || state.options.autoDismissTimeout,
                pauseOnHover: action.options.pauseOnHover || state.options.pauseOnHover,
              },
            };
          }
          return notification;
        }),
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default notificationReducer;
