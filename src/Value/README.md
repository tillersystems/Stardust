# Value

### Usage

```jsx
import { Value } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - Class needed by styled component.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `children`  |  `node`  |    `null`    |     -      |
| `className` | `string` |     `''`     |     -      |

### Example

```jsx
import { Value } from '@tillersystems/stardust';

render() {
  return (
    <Value positive>+10</Value>
  );
}
```
