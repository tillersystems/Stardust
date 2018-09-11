# Icon

### Usage

```jsx
import Icon from 'components/Icon';

// or

import { Icon } from 'components';
```

<!-- STORY -->

### Properties

- `name` - name of the icon.
- `color` - color of the icon.
- `width` - width of the icon.
- `height` - height of the icon.
- `spin` - whether the icon is spinning or not.
- `marginRight` - whether the icon need a right margin or not. Mostly used with text.
- `marginLeft` - whether the icon need a left margin or not. Mostly used with text.

| propName      | propType | defaultValue | isRequired |
| ------------- | :------: | :----------: | :--------: |
| `name`        | `string` |              |     \*     |
| `color`       | `string` |   `white`    |     -      |
| `width`       | `number` |     `20`     |     -      |
| `height`      | `number` |     `20`     |     -      |
| `spin`        |  `bool`  |   `false`    |     -      |
| `marginRight` |  `bool`  |   `false`    |     -      |
| `marginLeft`  |  `bool`  |   `false`    |     -      |

### Example

```jsx
import Icon from 'components/Icon';

render() {
  return <Icon name="tiller" />;
}
```
