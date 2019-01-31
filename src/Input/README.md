# Input

### Usage

```jsx
import { Input } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `id` - the ID of the input.
- `width` - the width of the input.
- `fluid` - whether the input takes all available space or not.
- `type` - the type of input (`text` or `password`).
- `value` - the value of the input.
- `tabIndex` - index of the input in a parent form.
- `placeholder` - placeholder text.
- `disabled` - whether the input is disabled or not.
- `onChange` - handler of input value change.
- `onFocus` - handler of input gains focus.
- `onBlur` - handler of input looses focus.
- `label` - name of label icon.
- `labelPosition` - position of label (`left` or `right`).
- `loading` - whether the input as status loading.
- `info` - whether the input as status info.
- `success` - whether the input as status success.
- `warning` - whether the input as status warning.
- `error` - whether the input as status error.
- `search` - whether the input as status search.

| propName        | propType | defaultValue | isRequired |
| --------------- | :------: | :----------: | :--------: |
| `width`         | `string` |   `25rem`    |     -      |
| `fluid`         |  `bool`  |   `false`    |     -      |
| `type`          | `string` |    `text`    |     -      |
| `id`            | `string` |     `''`     |     -      |
| `value`         | `string` |     `''`     |     -      |
| `tabIndex`      | `string` |     `0`      |     -      |
| `placeholder`   | `string` |     `''`     |     -      |
| `disabled`      |  `bool`  |   `false`    |     -      |
| `onChange`      |  `func`  |    `null`    |     -      |
| `onFocus`       |  `func`  |  `() => {}`  |     -      |
| `onBlur`        |  `func`  |  `() => {}`  |     -      |
| `label`         | `string` |    `null`    |     -      |
| `labelPosition` | `string` |    `left`    |     -      |
| `loading`       |  `bool`  |   `false`    |     -      |
| `info`          |  `bool`  |   `false`    |     -      |
| `success`       |  `bool`  |   `false`    |     -      |
| `warning`       |  `bool`  |   `false`    |     -      |
| `error`         |  `bool`  |   `false`    |     -      |
| `search`        |  `bool`  |   `false`    |     -      |

### Example

#### Standard use case

The following snippet shows how to create a controlled input.

```jsx
import Input from 'components/Input';

render() {
  return (
    <Input
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
import Input from 'components/Input';

render() {
  return (
    <Input disabled />
  );
}
```

#### Input with status

The following snippet shows how to create an input with a status (a search input in this case).

```jsx
import Input from 'components/Input';

render() {
  return (
    <Input search />
  );
}
```

#### Input with label

The following snippet shows how to create an input with a label.

```jsx
import Input from 'components/Input';

render() {
  return (
    <Input label="euro" labelPosition="right" />
  );
}
```
