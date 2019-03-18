# DatePicker

### Usage

```jsx
import { DatePicker } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - Class needed by styled component.
- `locale` - The locale to display the weekday names.
- `value` - The value of the selected date (controlled mode).
- `minDate` - The minimum selectable date.
- `maxDate` - The maximum selectable date.
- `numberOfMonthsToDisplay` - The number of month to display (1 or 2).
- `onDateChanged` - Handler of date change.
- `rangePicker` - Whether it is a date picker or a date range picker.

| `propName`                |     propType     | defaultValue | isRequired |
| ------------------------- | :--------------: | :----------: | :--------: |
| `className`               |     `string`     |     `''`     |     -      |
| `locale`                  |     `string`     |     `en`     |     -      |
| `value`                   | `luxon.DateTime` |    `null`    |     -      |
| `minDate`                 | `luxon.DateTime` |    `null`    |     -      |
| `maxDate`                 | `luxon.DateTime` |    `null`    |     -      |
| `numberOfMonthsToDisplay` |     `number`     |     `1`      |     -      |
| `onDateChanged`           |    `function`    |  `() => {}`  |     -      |
| `rangePicker`             |    `boolean`     |   `false`    |     -      |

### Examples

The `DatePicker` can be used in two modes, in either controlled or uncontrolled mode.
In uncontrolled mode, the `DatePicker` manages the selected date internally (yet, the `onDateChanged`
handler is called upon changes). In controlled mode, the selected date is based on the given `value`
prop. The `onDateChanged` handler is called upon user changes, but the selected value won't be affected
unless the `value` prop is updated.

#### Uncontrolled example

```jsx
import { DatePicker } from '@tillersystems/stardust';

render() {
  return <DatePicker />
}
```

#### Controlled example

```jsx
import { DatePicker } from '@tillersystems/stardust';
import { DateTime } from 'luxon';

let value = DateTime.locale();

handleChange = date => value = date;

render() {
  return <DatePicker value={value} onChange={handleChange} />
}
```
