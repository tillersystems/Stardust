# Message

### Usage

```jsx
import { Message } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - className needed by styled components.
- `description` - An alert can have a message description.
- `onClose` -An alert can have a clickable button to close it.
- `type` - The type of the message box.

| propName    |                       propType                       | defaultValue | isRequired |
| ----------- | :--------------------------------------------------: | :----------: | :--------: |
| `className` |                       `string`                       |     `''`     |            |
| `message`   |                       `string`                       |              |     \*     |
| `onClose`   |                        `func`                        |  `() => {}`  |            |
| `type`      | `enum: 'info', 'success', 'warning', 'error' 'info'` |    `info`    |            |

### Example

```jsx
import { Message } from '@tillersystems/stardust';

render() {
  return (
    <Message description="this is a message" type="success">
  );
}
```
