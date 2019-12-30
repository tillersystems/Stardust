# Select

### Usage

Select component displays a button decorated to show possibilty of opening a popover in which user
can select one or many (if allowMultiple is provided) values.

Options can be passed as children (must be of type Select.Option) or an array passed as `options`.
Popover contains an OptionsList, so all features are dealt with OptionsList and all props are passed through.
See [OptionsList](/?path=/story/optionslist--default).

Header is a decorated Button to show selected Values, which is available as `Select.Header`.

```jsx
import { Select } from '@tillersystems/stardust';
```

<!-- STORY -->

| Name                  | Required |   Type   | DefaultValue |                                                          Description                                                          |
| --------------------- | :------: | :------: | :----------: | :---------------------------------------------------------------------------------------------------------------------------: |
| `children`            |    -     |  `node`  |    `null`    |                                    Must be multiple children each containing a value prop                                     |
| `className`           |    -     | `string` |     `''`     |                                               Prop needed by styled components                                                |
| `contentRef`          |    -     |  `func`  |      -       |                                                Callback ref of content element                                                |
| `contentWrapperStyle` |    -     | `object` |      -       |                                          Style object to override Content of Popover                                          |
| `disabled`            |    -     |  `bool`  |   `false`    |                                            If the select should be disabled or not                                            |
| `HeaderComponent`     |    -     |  `func`  |      -       |                                                The component to use as Header                                                 |
| `isOpen`              |    -     |  `bool`  |      -       |                                               Use to control opening of Popover                                               |
| `modifiers`           |    -     | `object` |      -       | Customize popper behaviour. Plugins to alter the behaviour of the popper. See https://popper.js.org/popper-documentation.html |
| `onChange`            |    -     |  `func`  |      -       |                                Callback fired when an element of the `<Select />` is selected                                 |
| `onToggle`            |    -     |  `func`  |      -       |                           Callback fired when the `<Select />` is toggled (becomes closed or open)                            |
| `placeholder`         |    -     | `string` |      -       |                                    Placeholder of the `<Select />`component in the header                                     |
| `usePortal`           |    -     |  `bool`  |      -       |                                               Displays the content on a portal                                                |
| `values`              |    -     | `array`  |      -       |                                                        Selected values                                                        |
| `options`             |    -     | `array`  |      -       |                                                  Alternative to use children                                                  |
| `...OptionsList`      |    -     | `Props`  |      -       |                                               You can use any OptionsList props                                               |

### Example

```jsx
import { Select } from '@tillersystems/stardust';

const CustomHeader = (props) => <Select.Header displayValue="Custom display value" {...props} />

render() {
  return (
    <Select HeaderComponent={CustomHeader}>
      <Select.Option>Home</Select.Option>
      <Select.Option>Calendar</Select.Option>
      <Select.Option>Settings</Select.Option>
      <Select.Option>User</Select.Option>
    </Select>
  );
}
```
