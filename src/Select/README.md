# RadioGroup

### Usage

```jsx
import { Select } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `title` - Add a title to the select.
- `prefix` - Add a text aside in the select next the selected value.
- `selectedValue` - Pre select the value if defined.
- `show` - Toggle the dropdown.

| propName        | propType | defaultValue | isRequired |
| --------------- | :------: | :----------: | :--------: |
| `title`         | `string` |    `null`    |     -      |
| `prefix`        | `string` |    `null`    |     -      |
| `selectedValue` | `string` |    `null`    |     -      |
| `show`          |  `bool`  |   `false`    |     -      |

### Example

```jsx
import { Select } from '@tillersystems/stardust';

render() {
  return (
    <Select title="menu">
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
