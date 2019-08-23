# ToggleButton

### Usage

A Toggle Button represents the switch between two states, on or off.

```jsx
import { ToggleButton } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Properties

| Name        | Required |   Type   | DefaultValue |              Description              |
| ----------- | :------: | :------: | :----------: | :-----------------------------------: |
| `checked`   |    -     |  `bool`  |   `false`    | Whether the button is checked or not  |
| `className` |    -     | `string` |     `''`     | className needed by styled component  |
| `disabled`  |    -     |  `bool`  |   `false`    | Whether the button is disabled or not |
| `onToggle`  |    -     |  `func`  |  `() => {}`  |  Callback when component is clicked   |

### Example

```jsx
import { ToggleButton } from '@tillersystems/stardust';

render() {
  return <ToggleButton />
}
```
