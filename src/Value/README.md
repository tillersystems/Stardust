# Value

### Usage

```jsx
import { Value } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - Class needed by styled component.
- `positive` - A value can be positive.
- `negative` - A value can be negative.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `children`  |  `node`  |    `null`    |     -      |
| `className` | `string` |     `''`     |     -      |
| `positive`  | `string` |   `false`    |     -      |
| `negative`  | `string` |   `false`    |     -      |

### Example

```jsx
import { Value } from '@tillersystems/stardust';

render() {
  return (
    <Value positive>+10</Value>
  );
}
```
