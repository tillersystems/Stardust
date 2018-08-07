# DatePicker

### Usage

```jsx
import DatePicker from 'components/Date/DatePicker';

// or

import { DatePicker } from 'components';
```

<!-- STORY -->

### Properties

- `className` - Class needed by styled component.
- `locale` - The locale to display the weekday names.
- `value` - The value of the selected date (controlled mode).
- `defaultValue` - The default selected date (uncontrolled mode).
- `minDate` - The minimum selectable date.
- `maxDate` - The maximum selectable date.
- `onChange` - Handler on date changed.

| `propName`     |     propType     | defaultValue | isRequired |
| -------------- | :--------------: | :----------: | :--------: |
| `className`    |     `string`     |     `''`     |     -      |
| `locale`       |     `string`     |     `en`     |     -      |
| `value`        | `luxon.DateTime` |    `null`    |     -      |
| `defaultValue` | `luxon.DateTime` |   `today`    |     -      |
| `minDate`      | `luxon.DateTime` |    `null`    |     -      |
| `maxDate`      | `luxon.DateTime` |    `null`    |     -      |
| `onChange`     |    `function`    |  `() => {}`  |     -      |

### Examples

The `DatePicker` can be used in two modes, in either controlled or uncontrolled mode.
In uncontrolled mode, the `DatePicker` manages the selected date internally (yet, the `onChange`
handler is called upon changes). In controlled mode, the selected date is based on the given `value`
prop. The `onChange` handler is called upon user changes, but the selected value won't be affected
unless the `value` prop is updated.

#### Uncontrolled example

```jsx
import { DatePicker } from 'components';

render() {
  return <DatePicker />
}
```

#### Controlled example

```jsx
import { DatePicker } from 'components';
import { DateTime } from 'luxon';

let value = DateTime.locale();

handleChange = date => value = date;

render() {
  return <DatePicker value={value} onChange={handleChange} />
}
```
