# Kpi Block

### Usage

```jsx
import { KpiBlock } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `className` - Class needed by styled component.
- `title` - KpiBlock title.
- `value` - KpiBlock value.
- `variation` - KpiBlock variation (negative or positive).

| propName    |     propType      | defaultValue | isRequired |
| ----------- | :---------------: | :----------: | :--------: |
| `className` |     `string`      |     `''`     |     -      |
| `title`     |     `string`      |              |     \*     |
| `value`     | `string` / `node` |              |     \*     |
| `variation` | `number` / `bool` |              |     -      |

### Example

```jsx
import { KpiBlock } from '@tillersystems/stardust';

render() {
  return <KpiBlock title="commandes" value="657" variation={5} />
}
```
