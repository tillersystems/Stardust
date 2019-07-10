# Notification

<!-- STORY -->

## NotificationProvider

### Usage

Wrap your app in the `NotificationProvider`, which provides context for the Notification descendants.

### Properties

- `autoDismiss` - Whether or not to dismiss the notification automatically after a timeout.
- `autoDismissTimeout` - The time until a notification is automaticaly dismissed, in milliseconds.
- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `placement` - Placement of the notification on the screen.
- `pauseOnHover` - Whether or not to pause the timeout when hovered.

| propName             | propType  |  defaultValue  | isRequired |
| -------------------- | :-------: | :------------: | :--------: |
| `autoDismiss`        | `boolean` |    `false`     |     -      |
| `autoDismissTimeout` | `number`  |     `3000`     |     -      |
| `children`           |  `node`   |     `null`     |     -      |
| `placement`          | `string`  | `bottom-right` |     -      |
| `pauseOnHover`       | `boolean` |    `false`     |     -      |

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
