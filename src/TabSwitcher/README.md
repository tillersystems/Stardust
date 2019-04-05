# TabSwitcher

### Usage

```jsx
import { TabSwitcher } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `activeIndex` - index of the active tab
- `children` - tabs and panes to be displayed
- `isCompacted` - if it should reduce its size by reducing padding and font-size
- `onActiveTabChange` - onActiveTabChange - callback triggered when the active tab changes

| propName            | propType  | defaultValue | isRequired |
| ------------------- | :-------: | :----------: | :--------: |
| `activeIndex`       | `number`  |     `0`      |     -      |
| `children`          |  `node`   |    `null`    |     -      |
| `isCompacted`       | `boolean` |   `false`    |     -      |
| `onActiveTabChange` |  `func`   |  `() => {}`  |     -      |

### Example

```jsx
import { TabSwitcher } from '@tillersystems/stardust';

const panes = [
  {
    name: 'Tab 1',
    content: 'Content 1',
  },
  {
    name: 'Tab 2',
    content: 'Content 2',
  },
  {
    name: 'Tab 3',
    content: 'Content 3',
  },
  {
    name: 'Tab 4',
    content: 'Content 4',
  },
];

render() {
  <TabSwitcher>
    <TabSwitcher.Tabs>
      {panes.map(({ name }) => (
        <TabSwitcher.Tab key={name}>{name}</TabSwitcher.Tab>
      ))}
    </TabSwitcher.Tabs>
    <TabSwitcher.Panes>
      {panes.map(({ name, content }) => (
        <TabSwitcher.Pane key={name}>{content}</TabSwitcher.Pane>
      ))}
    </TabSwitcher.Panes>
  </TabSwitcher>
}
```
