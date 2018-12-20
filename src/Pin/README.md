# Pin

### Usage

```jsx
import { Pin } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `color` - Pin color.
- `height` - Pin height.
- `width` - Pin width.

| propName | propType | defaultValue | isRequired |
| -------- | -------- | ------------ | ---------- |
| `color`  | `string` |              | \*         |
| `height` | `string` | `1rem`       | -          |
| `width`  | `string` | `1rem`       | -          |

### Example

```jsx
import { Pin } from '@tillersystems/stardust';

render() {
  return (
    <Pin color="red" width='3rem' height='3rem' />
  )
}
```
