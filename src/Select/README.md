# Select

### Usage

```jsx
import { Select } from '@tillersystems/stardust';
```

<!-- STORY -->

| propName      | propType  | defaultValue | isRequired |
| ------------- | :-------: | :----------: | :--------: |
| `children`    | `string`  |    `null`    |     -      |
| `className`   | `string`  |     `''`     |     -      |
| `disabled`    |  `bool`   |   `false`    |     -      |
| `onChange`    |  `func`   |      -       |     -      |
| `onToggle`    |  `func`   |      -       |     -      |
| `placeholder` | `string`  |      -       |     -      |
| `resetValue`  | `boolean` |   `false`    |     -      |
| `width`       | `string`  |    `100%`    |     -      |

### Example

```jsx
import { Select } from '@tillersystems/stardust';

render() {
  return (
    <Select placeholder="placeholder">
      <Select.Option>Home</Select.Option>
      <Select.Option>Calendar</Select.Option>
      <Select.Option>Settings</Select.Option>
      <Select.Option>User</Select.Option>
    </Select>
  );
}
```
