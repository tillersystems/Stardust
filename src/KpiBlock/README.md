# Kpi Block

### Usage

```jsx
import { KpiBlock } from 'components/KpiBlock';

// or

import KpiBlock from 'components';
```

<!-- STORY -->

### Properties

- `className` - Class needed by styled component.
- `title` - KpiBlock title.
- `value` - KpiBlock value.
- `variation` - KpiBlock variation (negative or positive).

| propName | propType | defaultValue | isRequired |
| -------- | :------: | :----------: | :--------: |
| `className`| `string`|   `''`      |     -      |
| `title` | `string`  |              |     *      |
| `value` | `string`  |              |     *      |
| `variation`| `number`|             |     *      |

### Example

```jsx
import { KpiBlock } from 'components/KpiBlock';

render() {
  return <KpiBlock title="commandes" value="657" variation={5} />
}
```
