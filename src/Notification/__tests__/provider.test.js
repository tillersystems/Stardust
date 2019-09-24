import React from 'react';
import { fireEvent, wait, cleanup } from '@testing-library/react';
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

const NotificationComponentWithoutOptions = () => {
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
    <button type="button" onClick={() => addNotification(Component)}>
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
      <button type="button" onClick={() => dismissNotification('invalid-key')}>
        Dismiss with invalid key
      </button>
    </div>
  );
};

const NotificationComponentUpdate = ({
  autoDismiss,
  autoDismissTimeout,
  pauseOnHover,
  notifKey,
}) => {
  const { addNotification, updateNotification } = useNotifications();
  const Component = ({ onClose }) => (
    <div>
      This is a notification
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  );

  const UpdatedComponent = ({ onClose }) => (
    <div>
      updated notification
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
      <button type="button" onClick={() => updateNotification(UpdatedComponent, {})}>
        Update Notification without key
      </button>
      <button type="button" onClick={() => updateNotification(UpdatedComponent, { key: notifKey })}>
        Update Notification with valid key
      </button>
      <button
        type="button"
        onClick={() => updateNotification(UpdatedComponent, { key: notifKey, autoDismiss })}
      >
        Update Notification and add autoDismiss
      </button>
      <button
        type="button"
        onClick={() => updateNotification(UpdatedComponent, { key: 'invalid-key' })}
      >
        Update Notification with invalid key
      </button>
    </div>
  );
};

const NotificationComponentToTestGetNotification = ({
  autoDismiss,
  autoDismissTimeout,
  pauseOnHover,
  notifKey,
}) => {
  const { addNotification, getNotification } = useNotifications();
  const Component = ({ onClose }) => (
    <div>
      This is a notification
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  );

  const notification = getNotification(notifKey);

  return (
    <div>
      {notification && <div>notification exists</div>}
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
    </div>
  );
};

const NotificationComponentToTestGetNotificationWithoutKey = ({
  autoDismiss,
  autoDismissTimeout,
  pauseOnHover,
  notifKey,
}) => {
  const { addNotification, getNotification } = useNotifications();
  const Component = ({ onClose }) => (
    <div>
      This is a notification
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  );

  const notification = getNotification();

  return (
    <div>
      {notification && <div>notification exists</div>}
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
    </div>
  );
};

// TESTS

describe('<NotificationProvider />', () => {
  beforeAll(() => {
    const { error: originalError } = console;
    jest.spyOn(console, 'error').mockImplementation((message, ...args) => {
      originalError(message, ...args);
      throw new Error(message);
    });
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  afterEach(() => {
    console.error.mockClear();
  });

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

  test('should toggle the notification with default options', async () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponentWithoutOptions />
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

    const InvalidCloseButtonNode = getByText(/Dismiss with invalid key/i);
    fireEvent.click(InvalidCloseButtonNode);

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
    console.error.mockImplementation(() => {});
    expect(() => render(<NotificationComponent />)).toThrow();
    expect(console.error).toHaveBeenCalledTimes(2);

    const [[error]] = console.error.mock.calls;

    expect(error).toEqual(
      expect.stringContaining('useNotifications must be used within a NotificationProvider'),
    );
  });
});

describe('updateNotification', () => {
  test('should throw an error without key', () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponentUpdate
          autoDismiss
          autoDismissTimeout={3000}
          pauseOnHover={false}
          notifKey="test"
        />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);

    const NotificationNode = getByText(/This is a notification/i);

    expect(NotificationNode).toBeInTheDocument();

    expect(() => {
      const UpdateWithoutKeyButton = getByText(/Update Notification without key/i);
      fireEvent.click(UpdateWithoutKeyButton);
    }).toThrow('[updateNotification] key parameter in options is mandatory.');
  });

  test('should not update with invalid key', () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationComponentUpdate
          autoDismiss={false}
          autoDismissTimeout={3000}
          pauseOnHover={false}
          notifKey="test"
        />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);

    const NotificationNode = getByText(/This is a notification/i);

    expect(NotificationNode).toBeInTheDocument();

    // update with invalid key
    fireEvent.click(getByText(/Update Notification with invalid key/i));
    const UpdatedNotificationNode = queryByText(/updated notification/i);
    expect(UpdatedNotificationNode).not.toBeInTheDocument();
  });

  test('should update with valid key', () => {
    const { getByText } = render(
      <NotificationProvider>
        <NotificationComponentUpdate
          autoDismiss={false}
          autoDismissTimeout={3000}
          pauseOnHover={false}
          notifKey="test"
        />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);

    const NotificationNode = getByText(/This is a notification/i);

    expect(NotificationNode).toBeInTheDocument();

    // update with valid key
    fireEvent.click(getByText(/Update Notification with valid key/i));

    const UpdatedNotificationNode2 = getByText(/updated notification/i);
    expect(UpdatedNotificationNode2).toBeInTheDocument();
  });

  test('should update with valid key and extends timer', () => {
    const { getByText } = render(
      <NotificationProvider>
        <NotificationComponentUpdate
          autoDismiss
          autoDismissTimeout={3000}
          pauseOnHover={false}
          notifKey="test"
        />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);

    fireEvent.click(ButtonNode);

    const NotificationNode = getByText(/This is a notification/i);

    expect(NotificationNode).toBeInTheDocument();

    // update with valid key
    fireEvent.click(getByText(/Update Notification and add autoDismiss/i));

    const UpdatedNotificationNode2 = getByText(/updated notification/i);
    expect(UpdatedNotificationNode2).toBeInTheDocument();
  });
});

describe('getNotification', () => {
  beforeAll(() => {
    const { error: originalError } = console;
    jest.spyOn(console, 'error').mockImplementation((message, ...args) => {
      originalError(message, ...args);
      throw new Error(message);
    });
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  afterEach(() => {
    console.error.mockClear();
  });

  test('should return a notification if exists', () => {
    const { getByText, container } = render(
      <NotificationProvider>
        <NotificationComponentToTestGetNotification
          autoDismiss={false}
          autoDismissTimeout={3000}
          pauseOnHover={false}
          notifKey="test"
        />
      </NotificationProvider>,
    );

    const ButtonNode = getByText(/Add Notification/i);
    fireEvent.click(ButtonNode);

    const NotificationNode = getByText(/notification exists/i);

    expect(NotificationNode).toBeInTheDocument();
  });

  test('should throw an error if there is no key parameter', () => {
    console.error.mockImplementation(() => {});
    expect(() =>
      render(
        <NotificationProvider>
          <NotificationComponentToTestGetNotificationWithoutKey
            autoDismiss={false}
            autoDismissTimeout={3000}
            pauseOnHover={false}
            notifKey="test"
          />
        </NotificationProvider>,
      ),
    ).toThrow();
    expect(console.error).toHaveBeenCalledTimes(2);

    const [[error]] = console.error.mock.calls;

    expect(error).toEqual(expect.stringContaining('[getNotification] key parameter is mandatory.'));
  });
});
