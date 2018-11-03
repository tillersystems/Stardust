# Alert

### Usage

```jsx
import { Alert } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - className needed by styled components.
- `closable` - whether it is possible to close the alert box.
- `message` - An alert can have a message description.
- `onClose` -An alert can have a clickable button to close it.
- `type` - The type of the message box.

| propName    |                       propType                       | defaultValue | isRequired |
| ----------- | :--------------------------------------------------: | :----------: | :--------: |
| `className` |                       `string`                       |     `''`     |            |
| `closable`  |                        `bool`                        |   `false`    |            |
| `message`   |                       `string`                       |              |     \*     |
| `onClose`   |                        `func`                        |  `() => {}`  |            |
| `type`      | `enum: 'info', 'success', 'warning', 'error' 'info'` |    `info`    |            |

### Example

```jsx
import { Alert } from '@tillersystems/stardust';

render() {
  return (
    <Alert message="this is a message" type="success">
  );
}
```
