import notificationReducer from '../reducer';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, UPDATE_NOTIFICATION } from '../constants';

const previousState = {
  notificationsCount: 0,
  notifications: [],
  options: {
    autoDismiss: false,
    autoDismissTimeout: 1000,
    pauseOnHover: false,
  },
};

const previousStateWithNotification = {
  notificationsCount: 0,
  notifications: [
    {
      component: jest.fn(),
      key: 'stardust',
      options: {
        autoDismiss: false,
        autoDismissTimeout: 5000,
        pauseOnHover: true,
      },
    },
  ],
  options: {
    autoDismiss: false,
    autoDismissTimeout: 1000,
    pauseOnHover: false,
  },
};

describe('<NotificationProvider />', () => {
  test('should throw an error if incorrect type is passed', () => {
    const type = 'INCORRECT_TYPE';
    expect(() => {
      notificationReducer(previousState, {
        type,
        options: {
          autoDismiss: true,
          autoDismissTimeout: 5000,
          pauseOnHover: true,
        },
      });
    }).toThrow(`Unhandled action type: ${type}`);
  });

  test('should handle ADD_NOTIFICATION', () => {
    const nextState = notificationReducer(previousState, {
      type: ADD_NOTIFICATION,
      component: jest.fn(),
      options: {
        key: 'stardust',
        autoDismiss: true,
        autoDismissTimeout: 5000,
        pauseOnHover: true,
      },
    });
    expect(nextState).toMatchSnapshot();
  });

  test('should handle ADD_NOTIFICATION and take default values if not specified', () => {
    const nextState = notificationReducer(previousState, {
      type: ADD_NOTIFICATION,
      component: jest.fn(),
      options: {},
    });
    expect(nextState).toMatchSnapshot();
  });

  test('should update UPDATE_NOTIFICATION', () => {
    const nextState = notificationReducer(previousStateWithNotification, {
      type: UPDATE_NOTIFICATION,
      component: jest.fn(),
      options: {
        key: 'stardust',
        autoDismiss: true,
        autoDismissTimeout: 15000,
        pauseOnHover: true,
      },
    });
    expect(nextState).toMatchSnapshot();
  });

  test('should not UPDATE_NOTIFICATION with invalid key', () => {
    const nextState = notificationReducer(previousStateWithNotification, {
      type: UPDATE_NOTIFICATION,
      component: jest.fn(),
      options: {
        key: 'invalid-key',
        autoDismiss: true,
        autoDismissTimeout: 15000,
        pauseOnHover: true,
      },
    });
    expect(nextState).toMatchSnapshot();
  });

  test('should UPDATE_NOTIFICATION without all options (and take default values)', () => {
    const nextState = notificationReducer(previousStateWithNotification, {
      type: UPDATE_NOTIFICATION,
      component: jest.fn(),
      options: {
        key: 'stardust',
      },
    });
    expect(nextState).toMatchSnapshot();
  });

  test('should handle REMOVE_NOTIFICATION', () => {
    const nextState = notificationReducer(previousStateWithNotification, {
      type: REMOVE_NOTIFICATION,
      key: 'stardust',
    });
    expect(nextState).toMatchSnapshot();
  });
});
