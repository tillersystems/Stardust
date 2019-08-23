# Select

### Usage

Select component displays a button as header holding one value at a time amongst a list of values (children)

```jsx
import { Select } from '@tillersystems/stardust';
```

<!-- STORY -->

| Name                | Required |   Type    | DefaultValue |                                                          Description                                                          |
| ------------------- | :------: | :-------: | :----------: | :---------------------------------------------------------------------------------------------------------------------------: |
| `children`          |    -     |  `node`   |    `null`    |                                    Must be multiple children each containing a value prop                                     |
| `className`         |    -     | `string`  |     `''`     |                                               Prop needed by styled components                                                |
| `contentRef`        |    -     |  `func`   |      -       |                                                Callback ref of content element                                                |
| `disabled`          |    -     |  `bool`   |   `false`    |                                            If the select should be disabled or not                                            |
| `modifiers`         |    -     | `object`  |      -       | Customize popper behaviour. Plugins to alter the behaviour of the popper. See https://popper.js.org/popper-documentation.html |
| `onChange`          |    -     |  `func`   |      -       |                                 Callback fired when an element of the <Select /> is selected                                  |
| `onToggle`          |    -     |  `func`   |      -       |                            Callback fired when the <Select /> is toggled (becomes closed or open)                             |
| `placeholder`       |    -     | `string`  |      -       |                                     Placeholder of the <Select /> component in the header                                     |
| `resetValue`        |    -     | `boolean` |   `false`    |                                            If select value should be reset to null                                            |
| `triggerWrapperCss` |    -     |  `array`  |      -       |                      css provided to the trigger wrapper. Must use `css` method from styled-components.                       |
| `usePortal`         |    -     |  `bool`   |      -       |                                               Displays the content on a portal                                                |
| `value`             |    -     | `string`  |      -       |                                                   Selected value identifier                                                   |
| `width`             |    -     | `string`  |    `100%`    |                                                  CSS width of the component                                                   |

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
