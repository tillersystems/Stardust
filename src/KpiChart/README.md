# Kpi Chart

### Usage

```jsx
import { KpiChart } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

| Name          | Required |   Type   | DefaultValue | Description                                                                          |
| ------------- | :------: | :------: | :----------: | ------------------------------------------------------------------------------------ |
| `children`    |    \*    | `string` |              | Anything that can be rendered: numbers, strings, elements or an array (or fragment). |
| `className`   |    -     | `string` |     `''`     | ClassName needed by styled components                                                |
| `isCompacted` |    \*    | `string` |              | If true, narrows the padding of the component and the font-size of the title         |

### Example

```jsx
import { KpiChart } from '@tillersystems/stardust';

render() {
  return <KpiChart isCompacted>
           <KpiChart.Header>
             <KpiChart.Title isCompacted>Title</KpiChart.Title>
           </KpiChart.Header>
           <KpiChart.Body height={`${height}px`}>...</KpiChart.Body>
           <KpiChart.Footer>
             ...
           </KpiChart.Footer>
         </KpiChart>
}
```
