# DateRangePicker

### Usage

```jsx
import DateRangePicker from 'components/Date/DateRangePicker';

// or

import { DateRangePicker } from 'components';
```

<!-- STORY -->

### Properties

- `className` - Class needed by styled component.
- `locale` - The locale to display the weekday names.
- `value` - The value of the selected date (controlled mode).
- `minDate` - The minimum selectable date.
- `maxDate` - The maximum selectable date.
- `onChange` - Handler on date changed.

| `propName`  |     propType     | defaultValue | isRequired |
| ----------- | :--------------: | :----------: | :--------: |
| `className` |     `string`     |     `''`     |     -      |
| `locale`    |     `string`     |     `en`     |     -      |
| `value`     | `luxon.Interval` |    `null`    |     -      |
| `minDate`   | `luxon.DateTime` |    `null`    |     -      |
| `maxDate`   | `luxon.DateTime` |    `null`    |     -      |
| `onChange`  |    `function`    |  `() => {}`  |     -      |

### Examples

The `DateRangePicker` can be used in two modes, in either controlled or uncontrolled mode.
In uncontrolled mode, the `DateRangePicker` manages the selected date internally (yet, the
`onChange` handler is called upon changes). In controlled mode, the selected date is based on the
given `value` prop. The `onChange` handler is called upon user changes, but the selected value won't
be affected unless the `value` prop is updated.

#### Uncontrolled example

```jsx
import { DateRangePicker } from 'components';

render() {
  return <DateRangePicker />
}
```

#### Controlled example

```jsx
import { DateRangePicker } from 'components';
import { DateTime, Interval } from 'luxon';

let value = Interval.fromDateTimes(
    DateTime.locale(),
    DateTime.locale());

handleChange = date => value = date;

render() {
  return <DateRangePicker value={value} onChange={handleChange} />
}
```
