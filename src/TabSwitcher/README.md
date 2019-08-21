# TabSwitcher

### Usage

A TabSwitcher wraps all the logic between tabs (elements allowing to display content) and panes (content displayable when its tab is clicked)

```jsx
import { TabSwitcher } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

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
