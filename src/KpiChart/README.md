# Kpi Chart

### Usage

```jsx
import { KpiChart } from 'components/KpiChart';

// or

import KpiChart from 'components';
```

<!-- STORY -->

### Properties

- `className` - Class needed by styled component.
- `title` - KpiChart title.

| propName | propType | defaultValue | isRequired |
| -------- | :------: | :----------: | :--------: |
| `className`| `string`|   `''`      |     -      |
| `title` | `string`  |              |     *      |

### Example

```jsx
import { KpiChart } from 'components/KpiChart';

render() {
  return <KpiChart title="Chiffre d'affaires de la journée" />
}
```
