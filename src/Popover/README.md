# Popover

### Usage

```jsx
import { Popover } from 'components/Popover';

// or

import Popover from 'components';
```

<!-- STORY -->

### Properties

- `active` - Boolean set to display or hide the popover.
- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `width` - Popover width.

| propName   | propType | defaultValue | isRequired |
| ---------- | :------: | :----------: | :--------: |
| `active`   |  `bool`  |   `false`    |     -      |
| `children` |  `node`  |    `null`    |     -      |
| `width`    | `string` |   `28rem`    |     -      |

### Example

```jsx
import { Popover } from 'components/Popover';

render() {
  return <Popover width='28rem' />
}
```
