# Kpi Block

### Usage

```jsx
import { KpiBlock } from '@tillersystems/stardust';
```

A Kpi Block provides useful data pieces of information that should help users identity
the most important things about their data.

<!-- STORY -->

### Properties

| propName    | Required |     propType      | defaultValue |                                   Description                                   |
| ----------- | :------: | :---------------: | :----------: | :-----------------------------------------------------------------------------: |
| `className` |    -     |     `string`      |     `''`     |                        Class needed by styled component                         |
| `title`     |    \*    |     `string`      |              |                         Title displayed below the value                         |
| `value`     |    \*    | `string` / `node` |              |                   Value displayed at the center of the block                    |
| `variation` |    -     | `number` / `bool` |              | Variation, positive or negative, displayed at the top right corner of the block |

### Example

```jsx
import { KpiBlock } from '@tillersystems/stardust';

render() {
  return <KpiBlock title="commandes" value="657" variation={5} />
}
```
