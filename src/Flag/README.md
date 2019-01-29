# Flag

### Usage

```jsx
import { Flag } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `name` - name of the flag.
- `width` - width of the flag.
- `height` - height of the flag.

| propName | propType | defaultValue | isRequired |
| -------- | :------: | :----------: | :--------: |
| `name`   | `string` |              |     \*     |
| `width`  | `number` |     `20`     |     -      |
| `height` | `number` |     `20`     |     -      |

### Example

```jsx
import Flag from 'components/Flag';

render() {
  return <Flag name="fr" />;
}
```
