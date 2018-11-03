# Tag

### Usage

```jsx
import { Tag } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - className needed by styled components.
- `color` - the color of tag box.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `children`  |  `node`  |    `null`    |     -      |
| `className` | `string` |     `''`     |     -      |
| `color`     | `string` |    `` | -    |

### Example

```jsx
import { Tag } from '@tillersystems/stardust';

render() {
  return <Tag color="red">Error</CheckBox>
}
```
