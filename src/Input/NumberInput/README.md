# NumberInput

### Usage

```jsx
import { NumberInput } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `id` - the ID of the input.
- `width` - the width of the input.
- `fluid` - whether the input takes all available space or not.
- `value` - the value of the input.
- `tabIndex` - index of the input in a parent form.
- `disabled` - whether the input is disabled or not.
- `onChange` - handler of input value change.
- `onFocus` - handler of input gains focus.
- `onBlur` - handler of input looses focus.
- `label` - object defining the label (with either `icon` with the name of the icon to display, or
  `text` with the text to display);
- `labelPosition` - position of label (`left` or `right`).
- `validate` - whether the input has to be checked for validation or not
- `info` - whether the input as status info.
- `success` - whether the input as status success.
- `warning` - whether the input as status warning.
- `error` - whether the input as status error.
- `decimals` - numbers of decimals the value of input has to display.
- `separator` - what will separate the integer part from the decimals. Default value depends from user browser.
- `min` - mimimum value of the number value
- `max` - maximum value of the number value
- `step` - value of increment or decrement when using arrow keys

| propName        | propType | defaultValue | isRequired |
| --------------- | :------: | :----------: | :--------: |
| `id`            | `string` |     `''`     |     -      |
| `width`         | `string` |   `25rem`    |     -      |
| `fluid`         |  `bool`  |   `false`    |     -      |
| `value`         | `string` |     `''`     |     -      |
| `tabIndex`      | `string` |     `0`      |     -      |
| `disabled`      |  `bool`  |   `false`    |     -      |
| `onChange`      |  `func`  |    `null`    |     -      |
| `onFocus`       |  `func`  |  `() => {}`  |     -      |
| `onBlur`        |  `func`  |  `() => {}`  |     -      |
| `label`         | `Object` |    `null`    |     -      |
| `labelPosition` | `string` |    `left`    |     -      |
| `info`          |  `bool`  |   `false`    |     -      |
| `success`       |  `bool`  |   `false`    |     -      |
| `warning`       |  `bool`  |   `false`    |     -      |
| `error`         |  `bool`  |   `false`    |     -      |
| `decimals`      | `number` |     `0`      |     -      |
| `separator`     | `string` |     `.`      |     -      |
| `min`           | `number` |    `null`    |     -      |
| `max`           | `number` |    `null`    |     -      |
| `step`          | `number` |     `1`      |     -      |

### Example

#### Standard use case

The following snippet shows how to create a controlled input.

```jsx
import { NumberInput } from '@tillersystems/stardust';

render() {
  return (
    <NumberInput
      value={myValue}
      onChange={(newValue) => handleChange(newValue)}
    />
  );
}
```

#### Disabled input

The following snippet shows how to create a disabled input. _Note that even if the user cannot
enter values by focusing on the input, using a controlled input would allow use to change its
value_.

```jsx
import { NumberInput } from '@tillersystems/stardust';

render() {
  return (
    <NumberInput disabled />
  );
}
```

#### NumberInput with label

The following snippets show how to create an input with a label.

```jsx
import { NumberInput } from '@tillersystems/stardust';

render() {
  return (
    <NumberInput label={{ icon: "euro" }} labelPosition="right" />
  );
}
```

```jsx
import { NumberInput } from '@tillersystems/stardust';

render() {
  return (
    <NumberInput label={{ text: "http://" }} labelPosition="right" />
  );
}
```
