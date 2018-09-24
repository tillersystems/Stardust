# Alert

### Usage

```jsx
import { Alert } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - className needed by styled components.
- `message` - An alert can have a message description.
- `onClose` -An alert can have a clickable button to close it.
- `success` - An Alert can be success.
- `info` - An Alert can be info.
- `warning` - An Alert can be warning.
- `error` - An Alert can be error.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `className` | `string` |     `''`     |            |
| `message`   | `string` |              |     \*     |
| `onClose`   |  `func`  |  `() => {}`  |            |
| `success`   |  `bool`  |   `false`    |            |
| `info`      |  `bool`  |   `false`    |            |
| `warning`   |  `bool`  |   `false`    |            |
| `error`     |  `bool`  |   `false`    |            |

### Example

```jsx
import { Alert } from '@tillersystems/stardust';

render() {
  return (
    <Alert message="this is a message" success>
  );
}
```
