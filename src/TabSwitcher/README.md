# TabSwitcher

### Usage

```jsx
import { TabSwitcher } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - Tabs and Panes to be displayed.
- `defaultIndex` - Starts the tab at a specific index.
- `index` - Like form inputs, a tab's state can be controlled by the owner.
- `isCompacted` - If it is true, should reduce its size by reducing padding and font-size.
- `onChange` - Callback with the tab index triggered when the user changes tabs allowing your app to synchronize with it.

| propName       |  propType  | defaultValue | isRequired |
| -------------- | :--------: | :----------: | :--------: |
| `children`     |   `node`   |              |     \*     |
| `defaultIndex` |  `number`  |     `0`      |     -      |
| `index`        |  `number`  |     `0`      |     -      |
| `isCompacted`  | `boolean`  |   `false`    |     -      |
| `onChange`     | `function` | `undefined`  |     -      |

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
