# Tag

### Usage

A Tag categorizes or marks anything.

```jsx
import { Tag } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Properties

| Name        | Required |   Type   |              DefaultValue               |                                     Description                                     |
| ----------- | :------: | :------: | :-------------------------------------: | :---------------------------------------------------------------------------------: |
| `children`  |    -     |  `node`  |                 `null`                  | Anything that can be rendered: numbers, strings, elements or an array (or fragment) |
| `className` |    -     | `string` |                  `''`                   |                        className needed by styled components                        |
| `color`     |    -     | `string` | `` |The background color of the tag box |

### Example

```jsx
import { Tag } from '@tillersystems/stardust';

render() {
  return <Tag color="red">Error</Tag>
}
```
