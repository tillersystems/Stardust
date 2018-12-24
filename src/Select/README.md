# Select

### Usage

```jsx
import { Select } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - className needed by styled components.
- `onSelected` - Function fired when an element of the <Select /> is selected.
- `onToggle` - Function fired when the <Select /> is toggled.
- `title` - Title of the <Select /> component.

| propName     | propType | defaultValue | isRequired |
| ------------ | :------: | :----------: | :--------: |
| `children`   | `string` |    `null`    |     -      |
| `className`  | `string` |     `''`     |     -      |
| `onSelected` |  `func`  |  `() => {}`  |     -      |
| `onToggle`   |  `func`  |  `() => {}`  |     -      |
| `title`      | `string` |              |     \*     |

### Example

```jsx
import { Select } from '@tillersystems/stardust';

render() {
  return (
    <Select>
      <Select.Option>Home</Select.Option>
      <Select.Option>Calendar</Select.Option>
      <Select.Option>Settings</Select.Option>
      <Select.Option>User</Select.Option>
    </Select>
  );
}
```
