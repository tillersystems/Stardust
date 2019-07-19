import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import { NotificationProvider, useNotifications } from '../provider';

/*eslint react/prop-types:0*/
const NotificationComponent = ({ autoDismiss, autoDismissTimeout, pauseOnHover }) => {
  const { addNotification, dismissNotification } = useNotifications();
  const Component = () => (
    <div>
      This is a notification
      <button type="button" onClick={dismissNotification}>
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

  test('should autoDismiss the notification after 2000ms', async () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponent autoDismiss autoDismissTimeout={2000} pauseOnHover={false} />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);

    expect(getByText(/This is a notification/i)).toBeInTheDocument();

    await wait(() => expect(queryByText(/This is a notification/i)).toBeInTheDocument());
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
