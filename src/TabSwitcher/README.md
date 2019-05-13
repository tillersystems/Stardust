# TabSwitcher

### Usage

```jsx
import { TabSwitcher } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - Tabs and Panes to be displayed.
- `defaultTabId` - Starts the tab at a specific id.
- `tabId` - Like form inputs, a tab's state can be controlled by the owner.
- `onChange` - Callback with the tab id triggered when the user changes tabs allowing your app to synchronize with it.

| propName       |  propType  | defaultValue | isRequired |
| -------------- | :--------: | :----------: | :--------: |
| `children`     |   `node`   |              |     \*     |
| `defaultTabId` |  `string`  | `undefined`  |     -      |
| `tabId`        |  `string`  | `undefined`  |     -      |
| `onChange`     | `function` | `undefined`  |     -      |

### Example

```jsx
import { TabSwitcher } from '@tillersystems/stardust';

render() {
  <TabSwitcher defaultTabId="tab-1">
    <TabSwitcher.Tabs>
      <TabSwitcher.Tab id="tab-1">
        Tab 1
      </TabSwitcher.Tab>
      <TabSwitcher.Tab isDisabled id="tab-2">
        Tab 2
      </TabSwitcher.Tab>
      <TabSwitcher.Tab id="tab-3">
        Tab 3
      </TabSwitcher.Tab>
    </TabSwitcher.Tabs>
    <TabSwitcher.Panes>
      <TabSwitcher.Pane tabId="tab-1">Content 1</TabSwitcher.Pane>
      <TabSwitcher.Pane tabId="tab-2">Content 2</TabSwitcher.Pane>
      <TabSwitcher.Pane tabId="tab-3">Content 3</TabSwitcher.Pane>
    </TabSwitcher.Panes>
  </TabSwitcher>
}
```
