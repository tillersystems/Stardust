# DatePickerInput

### Usage

```jsx
import { DatePickerInput } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `fluid` - Whether the input takes all available space or not.
- `value` - The value of the selected date (controlled mode).
- `onChange` - Handler on date changed.
- `error` - Whether the input has a status error.
- `minDate` - The minimum selectable date.
- `maxDate` - The maximum selectable date.

| `propName` |     propType     | defaultValue | isRequired |
| ---------- | :--------------: | :----------: | :--------: |
| `fluid`    |      `bool`      |   `false`    |     -      |
| `value`    | `luxon.DateTime` |    `null`    |     -      |
| `onChange` |    `function`    |  `() => {}`  |     -      |
| `error`    |      `bool`      |   `false`    |     -      |
| `minDate`  | `luxon.DateTime` |    `null`    |     -      |
| `maxDate`  | `luxon.DateTime` |    `null`    |     -      |

### Examples

#### Uncontrolled example

```jsx
import { DatePickerInput } from '@tillersystems/stardust';

render() {
  return <DatePickerInput />
}
```

#### Controlled example

The following snippet shows how to create a controlled date picker input.

```jsx
import { DatePickerInput } from '@tillersystems/stardust';
import { DateTime } from 'luxon';

let value = DateTime.locale();

handleChange = date => value = date;

render() {
  return <DatePickerInput value={value} onChange={handleChange} />
}
```
