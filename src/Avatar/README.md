# Avatar

### Usage

```jsx
import { Avatar } from '@tillersystems/stardust';
```

<!-- STORY -->

### Description

An Avatar depicts an user with an image if its path is provided.  
It fallbacks to the initials of the person.

<!-- PROPS -->

### Properties

| Name        | Required |   Type   | DefaultValue |                Description                 |
| ----------- | :------: | :------: | :----------: | :----------------------------------------: |
| `className` |    -     | `string` |     `''`     |    className needed by styled component    |
| `name`      |    \*    | `string` |              | name that will form the displayed initials |
| `size`      |    -     | `number` |    `3.1`     |             size of the avatar             |
| `src`       |    -     | `string` |    `null`    |           source image of a user           |

### Example

```jsx
import { Avatar } from '@tillersystems/stardust';

render() {
  return <Avatar name={name} src={imageUrl} size={size} />;
}
```
