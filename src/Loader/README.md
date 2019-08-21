# Loader

### Usage

```jsx
import { Loader } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

| Name        |   Type   | DefaultValue | isRequired |             Description              |
| ----------- | :------: | :----------: | :--------: | :----------------------------------: |
| `className` | `string` |     `''`     |     -      | className needed by styled component |
| `color`     | `string` |    `blue`    |     -      |       The color of the Loader        |
| `height`    | `string` |    `2rem`    |     -      |       The height of the Loader       |
| `width`     | `string` |    `2rem`    |     -      |       The width of the Loader        |

### Example

```jsx
import { Loader } from '@tillersystems/stardust';

render() {
  return <Loader width="2rem" height="2rem" />
}
```
