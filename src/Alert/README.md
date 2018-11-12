# Alert

### Usage

```jsx
import { AlertProvider, AlertConsumer, Alert } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `component` - Presentational component for displaying message.
- `position` - Position of the alert on the screen.
- `timeout` - The time until an alert is dismissed, in milliseconds.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `children`  |  `node`  |    `null`    |     -      |
| `component` |  `func`  |     `''`     |     -      |
| `position`  | `string` | `top-center` |     -      |
| `timeout`   | `number` |    `` | -    |

### Presentational Alert component

By default `AlertProvider` uses `Message` component provided by the Stardust library. `Message` component is responsible for the accessibility and responsiveness of alert. Keep in mind, that if your replace it with your custom component - you will have to handle both of these features in your component if you need them in your app.

#### Properties

- `description` - Alert message description.
- `onClose` - An alert message should be closable.
- `onCloseText` - The text of the close button.
- `ariaLabel` - The ariaLabel responsible for the accessibility.
- `type` - The type of the alert message ('success', 'info', 'warning', 'error').

| propName      |                     propType                     |    defaultValue     | isRequired |
| ------------- | :----------------------------------------------: | :-----------------: | :--------: |
| `description` |                     `string`                     |                     |     \*     |
| `onClose`     |                      `func`                      |       `null`        |     -      |
| `onCloseText` |                     `string`                     |        `''`         |     -      |
| `ariaLabel`   |                     `string`                     | `description value` |     -      |
| `type`        | `oneOf(['success', 'info', 'warning', 'error'])` |       `info`        |     \*     |

### Example

```jsx
import { AlertProvider, AlertConsumer, Message, Button } from '@tillersystems/stardust';

render() {
  return (
    <AlertProvider component={Message} position="top-center" timeout=5000>
      <AlertConsumer>
        {({ show, hide }) => (
          <Button primary onClick={() => show({ ...alertProps, onClose: hide })}>
            Show alert
          </Button>
        )}
      </AlertConsumer>
    </AlertProvider>
  )
}
```
