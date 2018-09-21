# Avatar

### Usage

```jsx
import { Avatar } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - className needed by styled component.
- `name` - user name.
- `size` - size of the avatar.
- `src` - source image of a user.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `className` | `string` |     `''`     |     -      |
| `name`      | `string` |              |     \*     |
| `size`      | `number` |    `3.1`     |     -      |
| `src`       | `string` |    `null`    |     -      |

### Example

```jsx
import { Avatar } from '@tillersystems/stardust';

render() {
  return <Avatar name={name} src={imageUrl} size={size} />;
}
```
