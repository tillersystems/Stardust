# CheckBox

### Usage

```jsx
import { CheckBox } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Description

A CheckBox depicts a binary state if used alone, just as a ToggleButton, the difference being
that ToggleButton triggers the callback with the new state value, whereas the CheckBox
just triggers the callback without any argument so the parent needs to keep track by itself.

### Properties

| Name        | Required |   Type   | DefaultValue |                                               Description                                               |
| ----------- | :------: | :------: | :----------: | :-----------------------------------------------------------------------------------------------------: |
| `children`  |    -     |  `node`  |    `null`    |           Anything that can be rendered: numbers, strings, elements or an array (or fragment)           |
| `className` |    -     | `string` |     `''`     |                                  ClassName needed by styled components                                  |
| `checked`   |    -     |  `bool`  | `undefined`  |                                Specifies whether the checkbox is checked                                |
| `disabled`  |    -     |  `bool`  |   `false`    |                               Specifies whether the checkbox is disabled                                |
| `onChange`  |    -     |  `func`  |    `null`    |                               Callback triggered on CheckBox state change                               |
| `value`     |    -     | `string` |     `''`     | The value to be used in the checkbox input. This is the value that will be returned on form submission. |

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
