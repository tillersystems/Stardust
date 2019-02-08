# Select

### Usage

```jsx
import { Select } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - className needed by styled components.
- `onChange` - Function fired when an element of the `<Select />` is selected.
- `onToggle` - Function fired when the `<Select />` is toggled.
- `placeholder` - placeholder of the `<Select />` component.
- `initialValue` - displayed option value of the `<Select />`.
- `resetValue` - Reset the `<Select />` value.
- `width` - Width of the `<Select />`.

| propName       | propType  | defaultValue | isRequired |
| -------------- | :-------: | :----------: | :--------: |
| `children`     | `string`  |    `null`    |     -      |
| `className`    | `string`  |     `''`     |     -      |
| `onChange`     |  `func`   |  `() => {}`  |     -      |
| `onToggle`     |  `func`   |  `() => {}`  |     -      |
| `placeholder`  | `string`  |    `null`    |     -      |
| `initialValue` | `string`  |    `null`    |     -      |
| `resetValue`   | `boolean` |   `false`    |     -      |
| `width`        | `string`  |    `100%`    |     -      |

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
