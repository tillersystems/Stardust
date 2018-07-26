# Logo

### Usage

```jsx
import { Logo } from 'components/Logo';

// or

import Logo from 'components';
```

<!-- STORY -->

### Properties

- `color` - Logo color.
- `height` - Logo height.
- `width` - Logo width.

| propName | propType | defaultValue | isRequired |
| -------- | :------: | :----------: | :--------: |
| `color`  | `string` |   `white`    |     -      |
| `height` | `string` |     `28`     |     -      |
| `width`  | `string` |    `120`     |     -      |

### Example

```jsx
import { Logo } from 'components/Logo';

render() {
  return <Logo color="red" width="230" height="76" />
}
```
