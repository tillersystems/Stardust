# Loader

### Usage

```jsx
import { Loader } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - className needed by styled component.
- `color` - color.
- `height` - Loader height.
- `width` - Loader width.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `className` | `string` |     `''`     |     -      |
| `color`     | `string` |    `blue`    |     -      |
| `height`    | `string` |    `2rem`    |     -      |
| `width`     | `string` |    `2rem`    |     -      |

### Example

```jsx
import { Loader } from '@tillersystems/stardust';

render() {
  return <Loader width="2rem" height="2rem" />
}
```
