import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { NotificationProvider, useNotifications } from '../provider';

/*eslint react/prop-types:0*/
const NotificationComponent = ({ autoDismiss, autoDismissTimeout, pauseOnHover }) => {
  const { addNotification } = useNotifications();
  const Component = ({ onClose }) => (
    <div>
      This is a notification
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  );

  return (
    <button
      type="button"
      onClick={() => addNotification(Component, { autoDismiss, autoDismissTimeout, pauseOnHover })}
    >
      Add Notification
    </button>
  );
};
const NotificationComponentWithKey = ({
  autoDismiss,
  autoDismissTimeout,
  pauseOnHover,
  notifKey,
}) => {
  const { addNotification, dismissNotification } = useNotifications();
  const Component = ({ onClose }) => (
    <div>
      This is a notification
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  );

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          addNotification(Component, {
            autoDismiss,
            autoDismissTimeout,
            pauseOnHover,
            key: notifKey,
          })
        }
      >
        Add Notification
      </button>
      <button type="button" onClick={() => dismissNotification(notifKey)}>
        Dismiss Notification
      </button>
    </div>
  );
};

describe('<NotificationProvider />', () => {
  test('should render without a problem', () => {
    const { getByText } = render(
      <NotificationProvider>
        <NotificationComponent />
      </NotificationProvider>,
    );

    const childNode = getByText(/Add Notification/i);

    expect(childNode).toBeInTheDocument();
  });

  test('should toggle the notification', async () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponent autoDismiss={false} autoDismissTimeout={4000} pauseOnHover={false} />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);

    expect(getByText(/This is a notification/i)).toBeInTheDocument();

    const CloseNotificationButton = getByText(/close/i);

    fireEvent.click(CloseNotificationButton);

    await wait(() => expect(queryByText(/This is a notification/i)).not.toBeInTheDocument());
  });

  test('should toggle two notifications', async () => {
    const { getByText, getAllByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponent autoDismiss={false} autoDismissTimeout={4000} pauseOnHover={false} />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    // click twice to add two notifications
    fireEvent.click(ButtonNode);
    fireEvent.click(ButtonNode);

    expect(getAllByText(/This is a notification/i)).toHaveLength(2);

    const CloseNotificationButton = getAllByText(/close/i);

    // click on the first one to close one
    fireEvent.click(CloseNotificationButton[0]);

    await wait(() => expect(getAllByText(/This is a notification/i)).toHaveLength(1));

    fireEvent.click(CloseNotificationButton[1]);
    await wait(() => expect(queryByText(/This is a notification/i)).not.toBeInTheDocument());
  });

  test('should close notification on close button click', async () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponent autoDismiss={false} autoDismissTimeout={4000} pauseOnHover={false} />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);

    expect(getByText(/This is a notification/i)).toBeInTheDocument();

    const CloseNotificationButton = getByText(/close/i);

    // click on the close button
    fireEvent.click(CloseNotificationButton);

    await wait(() => expect(queryByText(/This is a notification/i)).not.toBeInTheDocument());
  });

  test('should autoDismiss the notification after 2000ms', async () => {
    jest.useFakeTimers();

    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponent autoDismiss autoDismissTimeout={2000} pauseOnHover={false} />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);

    // act used cause this jest.runOnlyPendingTimers() update Container state
    act(() => {
      // Fast forward and exhaust only currently pending timers
      jest.runOnlyPendingTimers();
    });

    wait(() => expect(queryByText(/This is a notification/i)).not.toBeInTheDocument());
  });

  test('should add and remove a notification with specific key', async () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponentWithKey autoDismiss={false} pauseOnHover={false} notifKey="test" />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);
    expect(getByText(/This is a notification/i)).toBeInTheDocument();

    const CloseButtonNode = getByText(/Dismiss Notification/i);

    fireEvent.click(CloseButtonNode);
    await wait(() => expect(queryByText(/This is a notification/i)).not.toBeInTheDocument());
  });

  test('should not add two notifications with same key', async () => {
    const { getByText, getAllByText } = render(
      <NotificationProvider>
        <NotificationComponentWithKey autoDismiss={false} pauseOnHover={false} notifKey="test" />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);
    fireEvent.click(ButtonNode);

    expect(getAllByText(/This is a notification/i)).toHaveLength(1);
  });

  test('should pause the notification timeout when hovered', async () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponent autoDismiss autoDismissTimeout={2000} pauseOnHover />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);

    const NotificationNode = getByText(/This is a notification/i);

    expect(NotificationNode).toBeInTheDocument();

    fireEvent.mouseEnter(NotificationNode);

    expect(NotificationNode).toBeInTheDocument();

    fireEvent.mouseLeave(NotificationNode);

    await wait(() => expect(queryByText(/This is a notification/i)).toBeInTheDocument());
  });

  test('should throw an error useNotifications is used without a provider', () => {
    expect(() => {
      render(<NotificationComponent />);
    }).toThrow('useNotifications must be used within a NotificationProvider');
  });
});
