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
        notifications: state.notifications.filter(n => n.key !== action.key),
      };

    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map(n => {
          if (n.key === action.options.key) {
            return {
              ...n,
              component: action.component,
              options: {
                autoDismiss: action.options.autoDismiss || state.options.autoDismiss,
                autoDismissTimeout:
                  action.options.autoDismissTimeout || state.options.autoDismissTimeout,
                pauseOnHover: action.options.pauseOnHover || state.options.pauseOnHover,
              },
            };
          }
          return n;
        }),
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default notificationReducer;
