/* eslint-disable react/display-name */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';

import TabSwitcher from '..';

storiesOf('TabSwitcher', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isDisabledValueTab1 = boolean('isDisabledTab1', false, 'ALL');
    const isDisabledValueTab2 = boolean('isDisabledTab2', false, 'ALL');
    const isDisabledValueTab3 = boolean('isDisabledTab3', false, 'ALL');

    return (
      <TabSwitcher defaultTabId="tab-1">
        <TabSwitcher.Tabs>
          <TabSwitcher.Tab isDisabled={isDisabledValueTab1} id="tab-1">
            Tab 1
          </TabSwitcher.Tab>
          <TabSwitcher.Tab isDisabled={isDisabledValueTab2} id="tab-2">
            Tab 2
          </TabSwitcher.Tab>
          <TabSwitcher.Tab isDisabled={isDisabledValueTab3} id="tab-3">
            Tab 3
          </TabSwitcher.Tab>
        </TabSwitcher.Tabs>
        <TabSwitcher.Panes>
          <TabSwitcher.Pane tabId="tab-1">Content 1</TabSwitcher.Pane>
          <TabSwitcher.Pane tabId="tab-2">Content 2</TabSwitcher.Pane>
          <TabSwitcher.Pane tabId="tab-3">Content 3</TabSwitcher.Pane>
        </TabSwitcher.Panes>
      </TabSwitcher>
    );
  })
  .add('controlled mode', () => {
    const isDisabledValueTab1 = boolean('isDisabledTab1', false, 'ALL');
    const isDisabledValueTab2 = boolean('isDisabledTab2', false, 'ALL');
    const isDisabledValueTab3 = boolean('isDisabledTab3', false, 'ALL');

    const onChangeAction = action('onChange');

    const store = new Store({
      activeTabId: 'tab-1',
    });

    return (
      <State store={store}>
        {state => (
          <TabSwitcher
            tabId={state.activeTabId}
            onChange={id => {
              store.set({ activeTabId: id });
              onChangeAction('Active Tab Index: ', id);
            }}
          >
            <TabSwitcher.Tabs>
              <TabSwitcher.Tab isDisabled={isDisabledValueTab1} id="tab-1">
                Tab 1
              </TabSwitcher.Tab>
              <TabSwitcher.Tab isDisabled={isDisabledValueTab2} id="tab-2">
                Tab 2
              </TabSwitcher.Tab>
              <TabSwitcher.Tab isDisabled={isDisabledValueTab3} id="tab-3">
                Tab 3
              </TabSwitcher.Tab>
            </TabSwitcher.Tabs>
            <TabSwitcher.Panes>
              <TabSwitcher.Pane tabId="tab-1">Content 1</TabSwitcher.Pane>
              <TabSwitcher.Pane tabId="tab-2">Content 2</TabSwitcher.Pane>
              <TabSwitcher.Pane tabId="tab-3">Content 3</TabSwitcher.Pane>
            </TabSwitcher.Panes>
          </TabSwitcher>
        )}
      </State>
    );
  });
