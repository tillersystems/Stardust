# ToggleButton

### Usage

A Toggle Button represents the switch between two states, on or off.

```jsx
import { ToggleButton } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Properties

| Name               | Required |   Type   | DefaultValue |                          Description                           |
| ------------------ | :------: | :------: | :----------: | :------------------------------------------------------------: |
| `className`        |    -     | `string` |     `''`     |              className needed by styled component              |
| `isChecked`        |    -     |  `bool`  |     `''`     |  Whether the button is checked or not in controlled component  |
| `isDefaultChecked` |    -     |  `bool`  |   `false`    | Whether the button is checked or not in uncontrolled component |
| `isDisabled`       |    -     |  `bool`  |   `false`    |             Whether the button is disabled or not              |
| `onToggle`         |    -     |  `func`  |  `() => {}`  |               Callback when component is clicked               |

### Example

```jsx
import { ToggleButton } from '@tillersystems/stardust';

render() {
  return <ToggleButton />
}
```
