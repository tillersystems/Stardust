import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './constants';
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
        isActive: true,
        component: action.component,
        options: {
          autoDismiss: action.options.autoDismiss
            ? action.options.autoDismiss
            : state.options.autoDismiss,
          autoDismissTimeout: action.options.autoDismissTimeout
            ? action.options.autoDismissTimeout
            : state.options.autoDismissTimeout,
          pauseOnHover: action.options.pauseOnHover
            ? action.options.pauseOnHover
            : state.options.pauseOnHover,
        },
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        isActive: false,
        component: null,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default notificationReducer;
