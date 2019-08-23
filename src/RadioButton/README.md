# RadioButton

### Usage

A Radio represents a single value from multiple options, so a Radio should be used with at least another one.

```jsx
import { RadioButton } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Example

```jsx
import { RadioButton } from '@tillersystems/stardust';

render() {
  return <RadioButton selectedValue={selectedValue} key="apple" id="apple" name="fruit" value="apple" onChange={this.handleChange}>apple</RadioButton>
}
```
