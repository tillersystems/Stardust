# CheckBox

### Usage

```jsx
import { CheckBox } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - Add a text aside in the select next the selected value.
- `checked` - Specifies whether the checkbox is selected.
- `disabled` - Specifies whether the checkbox is disabled.
- `onChange` - Callback whence clicked.
- `value` - The value to be used in the checkbox input. This is the value that will be returned on form submission.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `children`  |  `node`  |    `null`    |     -      |
| `className` | `string` |     `''`     |     -      |
| `checked`   |  `bool`  | `undefined`  |     -      |
| `disabled`  |  `bool`  |   `false`    |     -      |
| `onChange`  |  `func`  |    `null`    |     -      |
| `value`     | `string` |     `''`     |     -      |

### Example

```jsx
import { CheckBox } from '@tillersystems/stardust';

render() {
  return (
    <div>
      <CheckBox>Default</CheckBox>
      <CheckBox defaultChecked>Checked</CheckBox>
    </div>
  )
}
```
