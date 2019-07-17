# DatePickerInput

### Usage

The DatePickerInput component is a text input that toggles a popover with a date picker.
The date can be updated either on the input or on the date picker displayed through a Popover
component. Date picker will close on selected date or on outside click if the date picker
was open.

```jsx
import { DatePickerInput } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

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
