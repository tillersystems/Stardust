# RadioButton

### Usage

```jsx
import { RadioButton } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `id` - Link the label with the radio button.
- `value` - Defined the radio value.
- `onChange` - Callback whence clicked.
- `selectedValue` - Defined wich radio is checked.
- `disabled` - Whether the button is enabled or not.
- `name` - The name of the radio button group. In most of the case it will be defined by the `RadioGroup` component.

| propName   | propType | defaultValue | isRequired |
| ---------- | :------: | :----------: | :--------: |
| `id`       | `string` |    `null`    |     -      |
| `value`    | `string` |     `''`     |     -      |
| `value`    | `string` |    `null`    |     -      |
| `onChange` |  `func`  |  `() => {}`  |     -      |
| `disabled` |  `bool`  |    `true`    |     -      |
| `name`     | `string` |    `null`    |     -      |

### Example

```jsx
import { RadioButton } from '@tillersystems/stardust';

render() {
  return <RadioButton selectedValue={selectedValue} key="apple" id="apple" name="fruit" value="apple" onChange={this.handleChange}>apple</RadioButton>
}
```
