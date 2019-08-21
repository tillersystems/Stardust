# TextInput

### Usage

```jsx
import { TextInput } from '@tillersystems/stardust';
```

<!-- STORY -->

### Description

Defines a text input. Extra datas can be added, such as an Icon, or plain text, that will both be displayed either on the left or on the right of the actual text input.  
Custom styles to inform about the status of the input (convenient if used in a form) or its purpose
can also be added through the props available on the TextInput.

<!-- PROPS -->

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
