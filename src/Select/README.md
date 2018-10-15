# Select

### Usage

```jsx
import { Select } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `prefix` - Add a text aside in the select next the selected value.
- `selectedValue` - Pre select the value if defined.
- `show` - Toggle the dropdown.
- `placeholder` - Text written in the select to explicit the differents values.
- `onClick` - Function fired when an element of the dropdown is selected. Return the state in parameter.

| propName        | propType | defaultValue | isRequired |
| --------------- | :------: | :----------: | :--------: |
| `prefix`        | `string` |    `null`    |     -      |
| `selectedValue` | `string` |    `null`    |     -      |
| `show`          |  `bool`  |   `false`    |     -      |
| `placeholder`   | `string` |    `null`    |     -      |
| `onClick`       |  `func`  |    `null`    |     -      |

### Example

```jsx
import { Select } from '@tillersystems/stardust';

render() {
  return (
    <Select>
      <option value="home">Home</option>
      <option value="calendar">Calendar</option>
      <option value="settings">Settings</option>
      <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
        User
      </option>
    </Select>
  );
}
```
