# DatePicker

### Usage

```jsx
import { DatePicker } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Description

A DatePicker can display one or two months. It takes a value (`defaultValue` prop) to set its internal
selected value state, or takes the date of today by default.
The selected value can either be a date or an interval of Luxon.

### Properties

| Name                      | Required |       Type       | DefaultValue |                    Description                     |
| ------------------------- | :------: | :--------------: | :----------: | :------------------------------------------------: |
| `className`               |    -     |     `string`     |     `''`     |            Styled component class name             |
| `defaultValue`            |    -     | `luxon.DateTime` |    `null`    |           Controlled selected date value           |
| `locale`                  |    -     |     `string`     |     `en`     |      Locale used to display the weekday names      |
| `minDate`                 |    -     | `luxon.DateTime` |    `null`    |                Minimum allowed date                |
| `maxDate`                 |    -     | `luxon.DateTime` |    `null`    |                Maximum allowed date                |
| `numberOfMonthsToDisplay` |    -     |     `number`     |     `1`      |      The number of months to display (1 or 2)      |
| `onDateChanged`           |    -     |    `function`    |  `() => {}`  |               Handler of date change               |
| `rangePicker`             |    -     |    `boolean`     |   `false`    | Whether it is a date picker or a date range picker |
| `displayOnlyInMonth`      |    -     |    `boolean`     |   `false`    |    Whether we want to hide adjacent months days    |

### Examples

The `DatePicker` can be used in two modes, in either controlled or uncontrolled mode.
In uncontrolled mode, the `DatePicker` manages the selected date internally (yet, the `onDateChanged`
handler is called upon changes). In controlled mode, the selected date is based on the given `defaultValue`
prop. The `onDateChanged` handler is called upon user changes, but the selected value won't be affected
unless the `defaultValue` prop is updated.

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
  return <DatePicker defaultValue={value} onChange={handleChange} />
}
```
