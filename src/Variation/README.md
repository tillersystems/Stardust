# Variation

### Usage

```jsx
import { Variation } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - className needed by styled components.
- `negative` - By default a variation is positive but it can be negative.

| propName  | propType | defaultValue | isRequired |
| --------- | -------- | ------------ | ---------- |
| className | string   | ''           | -          |
| negative  | bool     | false        | -          |

### Example

```jsx
import { Variation } from '@tillersystems/stardust';

render() {
  return <Variation negative />
}
```
