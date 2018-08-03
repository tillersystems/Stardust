# ToggleButton

### Usage

```jsx
import { ToggleButton } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - class needed by styled component.
- `checked` - whether the button is checked or not.
- `disabled` - whether the button is disabled or not.
- `onToggle` - callback whence clicked.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `className` | `string` |     `''`     |     -      |
| `checked`   |  `bool`  |   `false`    |     -      |
| `disabled`  |  `bool`  |   `false`    |     -      |
| `onToggle`  |  `func`  |  `() => {}`  |     -      |

### Example

```jsx
import { ToggleButton } from '@tillersystems/stardust';

render() {
  return <ToggleButton />
}
```
