# TextInput

### Usage

```jsx
import { TextInput } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `id` - the ID of the input.
- `width` - the width of the input.
- `fluid` - whether the input takes all available space or not.
- `value` - the value of the input.
- `tabIndex` - index of the input in a parent form.
- `placeholder` - placeholder text.
- `disabled` - whether the input is disabled or not.
- `password` - whether the input is a password input or not.
- `onChange` - handler of input value change.
- `onFocus` - handler of input gains focus.
- `onBlur` - handler of input looses focus.
- `label` - object defining the label (with either `icon` with the name of the icon to display, or
  `text` with the text to display);
- `labelPosition` - position of label (`left` or `right`).
- `loading` - whether the input as status loading.
- `info` - whether the input as status info.
- `ghost` - Whether to display an input with no border.
- `success` - whether the input as status success.
- `warning` - whether the input as status warning.
- `error` - whether the input as status error.
- `search` - whether the input as status search.

| propName        | propType | defaultValue | isRequired |
| --------------- | :------: | :----------: | :--------: |
| `width`         | `string` |   `25rem`    |     -      |
| `fluid`         |  `bool`  |   `false`    |     -      |
| `id`            | `string` |     `''`     |     -      |
| `value`         | `string` |     `''`     |     -      |
| `tabIndex`      | `string` |     `0`      |     -      |
| `placeholder`   | `string` |     `''`     |     -      |
| `disabled`      |  `bool`  |   `false`    |     -      |
| `password`      |  `bool`  |   `false`    |     -      |
| `onChange`      |  `func`  |    `null`    |     -      |
| `onFocus`       |  `func`  |  `() => {}`  |     -      |
| `onBlur`        |  `func`  |  `() => {}`  |     -      |
| `label`         | `Object` |    `null`    |     -      |
| `labelPosition` | `string` |    `left`    |     -      |
| `loading`       |  `bool`  |   `false`    |     -      |
| `info`          |  `bool`  |   `false`    |     -      |
| `ghost`         |  `bool`  |   `false`    |     -      |
| `success`       |  `bool`  |   `false`    |     -      |
| `warning`       |  `bool`  |   `false`    |     -      |
| `error`         |  `bool`  |   `false`    |     -      |
| `search`        |  `bool`  |   `false`    |     -      |

### Example

#### Standard use case

The following snippet shows how to create a controlled input.

```jsx
import { TextInput } from '@tillersystems/stardust';

render() {
  return (
    <TextInput
      value={myValue}
      onChange={(newValue) => handleChange(newValue)}
      placeholder="Write something..."
    />
  );
}
```

#### Disabled input

The following snippet shows how to create a disabled input. _Note that even if the user cannot
enter values by focus the input anymore, using a controlled input would allow use to change its
value_.

```jsx
import { TextInput } from '@tillersystems/stardust';

render() {
  return (
    <TextInput disabled />
  );
}
```

#### TextInput with status

The following snippet shows how to create an input with a status (a search input in this case).

```jsx
import { TextInput } from '@tillersystems/stardust';

render() {
  return (
    <TextInput search />
  );
}
```

#### TextInput with label

The following snippets show how to create an input with a label.

```jsx
import { TextInput } from '@tillersystems/stardust';

render() {
  return (
    <TextInput label={{ icon: "euro" }} labelPosition="right" />
  );
}
```

```jsx
import { TextInput } from '@tillersystems/stardust';

render() {
  return (
    <TextInput label={{ text: "http://" }} labelPosition="right" />
  );
}
```
