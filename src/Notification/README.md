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
const { addNotification, dismissNotification } = useNotifications();
```

The `addNotification` method has 2 arguments:

- The first is the content of the notification, which can be any renderable `Node`.
- The second is the `Options` object.

```jsx
<Button onClick={onClick={() => addNotification(Component, { autoDismiss: true, autoDismissTimeout: 3000, pauseOnHover: true })}} />
```

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
