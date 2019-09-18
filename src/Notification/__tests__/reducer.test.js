import notificationReducer from '../reducer';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants';

const previousState = {
  notificationsCount: 0,
  notifications: [],
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
        autoDismiss: true,
        autoDismissTimeout: 5000,
        pauseOnHover: true,
      },
    });
    expect(nextState).toMatchSnapshot();
  });

  test('should handle REMOVE_NOTIFICATION', () => {
    const nextState = notificationReducer(previousState, {
      type: REMOVE_NOTIFICATION,
    });
    expect(nextState).toMatchSnapshot();
  });
});
