# User Info

### Usage

```jsx
import { UserInfo } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - className needed by styled component.
- `name` - user name.
- `onClick` - onClick trigger.
- `pictureSrc` - source image of a user.

| propName     | propType | defaultValue | isRequired |
| ------------ | :------: | :----------: | :--------: |
| `className`  | `string` |     `''`     |     -      |
| `name`       | `string` |              |     \*     |
| `onClick`    |  `func`  |  `() => {}`  |     -      |
| `pictureSrc` | `string` |    `null`    |     -      |

### Example

```jsx
import { UserInfo } from '@tillersystems/stardust';

render() {
  return <UserInfo name={name} pictureSrc="http://examplePictureUrl.com" onClick={() => {}} />;
}
```
