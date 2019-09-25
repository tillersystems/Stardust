# Notification

<!-- STORY -->

## NotificationProvider

<!-- PROPS -->

### Usage

Wrap your app in the `NotificationProvider`, which provides context for the Notification descendants.

### Example

```jsx
import { NotificationProvider } from '@tillersystems/stardust';

render() {
  return (
    <NotificationProvider>
      <Children />
    </NotificationProvider>
  )
}
```

## Hook

### Usage

```jsx
import { useNotifications } from '@tillersystems/stardust';
```

The `useNotification` hook has the following signature:

```jsx
const {
  addNotification,
  dismissNotification,
  updateNotification,
  getNotification,
} = useNotifications();
```

#### Add a notification

The `addNotification` method has 2 arguments:

- The first is the content of the notification, which can be any renderable `Node`.
- The second is the `Options` object.

```jsx
<Button onClick={onClick={() => addNotification(Component, { autoDismiss: true, autoDismissTimeout: 3000, pauseOnHover: true })}} />
```

#### Get a notification

The `getNotification` has 1 argument: `key`. It will return an object if the notification exists or `undefined`

```jsx
getNotification(key);
```

#### Update a notification and its options

The `updateNotification` method has 2 arguments:

- The first is the content of the notification, which can be any renderable `Node`.
- The second is the `Options` object. The `key` is mandatory.

```jsx
<Button onClick={onClick={() => updateNotification(Component, {
    key: 'my-notification-key',
    autoDismiss: true,
    autoDismissTimeout: 3000,
    pauseOnHover: true
  })}}
/>
```

#### Remove a notification

The `dismissNotification` has 1 argument: `key` to remove a specific notification on screen.

```jsx
dismissNotification(key);
```

The notifcation can be manually closed by calling the `onClose` method injected by the NotificationContainer in the inner component props.

```jsx
const Component = ({ onClose }) => (
  <Message description="I'm a notification component" type="success" onClose={onClose} />
);
```
