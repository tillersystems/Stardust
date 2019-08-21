# NumberInput

### Usage

```jsx
import { NumberInput } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

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
