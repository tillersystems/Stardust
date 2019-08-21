# Message

### Usage

```jsx
import { Message } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Properties

| Name        | Required |                         Type                         | DefaultValue |                     Description                      |
| ----------- | :------: | :--------------------------------------------------: | :----------: | :--------------------------------------------------: |
| `className` |          |                       `string`                       |     `''`     |        className needed by styled components         |
| `message`   |    \*    |                       `string`                       |              |          Text displayed in the message box           |
| `onClose`   |          |                        `func`                        |  `() => {}`  |  Callback triggered when the close icon is clicked   |
| `type`      |          | `enum: 'info', 'success', 'warning', 'error' 'info'` |    `info`    | Type of the message box varying the style of the box |

### Example

```jsx
import { Message } from '@tillersystems/stardust';

render() {
  return (
    <Message description="this is a message" type="success">
  );
}
```
