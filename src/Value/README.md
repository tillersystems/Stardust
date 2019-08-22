# Value

### Usage

A value is a number that can be positive (green), negative (red) or neutral (dark blue).

```jsx
import { Value } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

| Name        | Required |   Type   | DefaultValue |                                     Description                                     |
| ----------- | :------: | :------: | :----------: | :---------------------------------------------------------------------------------: |
| `children`  |    -     |  `node`  |    `null`    | anything that can be rendered: numbers, strings, elements or an array (or fragment) |
| `className` |    -     | `string` |     `''`     |                        className needed by styled-components                        |
| `positive`  |    -     | `string` |   `false`    |                              If the value is positive                               |
| `negative`  |    -     | `string` |   `false`    |                              If the value is negative                               |

### Example

```jsx
import { Value } from '@tillersystems/stardust';

render() {
  return (
    <Value positive>+10</Value>
  );
}
```
