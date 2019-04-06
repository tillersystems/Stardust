/* eslint-disable react/display-name */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';

import TabSwitcher from '..';

storiesOf('TabSwitcher', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isDisabledValueTab1 = boolean('isDisabledTab1', false, 'ALL');
    const isDisabledValueTab2 = boolean('isDisabledTab2', false, 'ALL');
    const isDisabledValueTab3 = boolean('isDisabledTab3', false, 'ALL');
    const isDisabledValueTab4 = boolean('isDisabledTab4', false, 'ALL');

    const isCompactedValue = boolean('isCompactedValue', false, 'ALL');

    const panes = [
      {
        name: 'Tab 1',
        content: 'Content 1',
        isDisabled: isDisabledValueTab1,
      },
      {
        name: 'Tab 2',
        content: 'Content 2',
        isDisabled: isDisabledValueTab2,
      },
      {
        name: 'Tab 3',
        content: 'Content 3',
        isDisabled: isDisabledValueTab3,
      },
      {
        name: 'Tab 4',
        content: 'Content 4',
        isDisabled: isDisabledValueTab4,
      },
    ];

    const degaultIndexValue = number(
      'default index',
      0,
      {
        range: true,
        min: 0,
        max: 3,
        step: 1,
      },
      'ALL',
    );

    return (
      <TabSwitcher defaultIndex={degaultIndexValue} isCompacted={isCompactedValue}>
        <TabSwitcher.Tabs>
          {panes.map(({ isDisabled, name }) => (
            <TabSwitcher.Tab key={name} isDisabled={isDisabled}>
              {name}
            </TabSwitcher.Tab>
          ))}
        </TabSwitcher.Tabs>
        <TabSwitcher.Panes>
          {panes.map(({ name, content }) => (
            <TabSwitcher.Pane key={name}>{content}</TabSwitcher.Pane>
          ))}
        </TabSwitcher.Panes>
      </TabSwitcher>
    );
  })
  .add('controlled mode', () => {
    const isDisabledValueTab1 = boolean('isDisabledTab1', false, 'ALL');
    const isDisabledValueTab2 = boolean('isDisabledTab2', false, 'ALL');
    const isDisabledValueTab3 = boolean('isDisabledTab3', false, 'ALL');
    const isDisabledValueTab4 = boolean('isDisabledTab4', false, 'ALL');

    const isCompactedValue = boolean('isCompactedValue', false, 'ALL');

    const panes = [
      {
        name: 'Tab 1',
        content: 'Content 1',
        isDisabled: isDisabledValueTab1,
      },
      {
        name: 'Tab 2',
        content: 'Content 2',
        isDisabled: isDisabledValueTab2,
      },
      {
        name: 'Tab 3',
        content: 'Content 3',
        isDisabled: isDisabledValueTab3,
      },
      {
        name: 'Tab 4',
        content: 'Content 4',
        isDisabled: isDisabledValueTab4,
      },
    ];

    const onChangeAction = action('onChange');

    const store = new Store({
      activeTabIndex: 0,
    });

    return (
      <State store={store}>
        {state => (
          <TabSwitcher
            index={state.activeTabIndex}
            isCompacted={isCompactedValue}
            onChange={index => {
              store.set({ activeTabIndex: index });
              onChangeAction('Active Tab Index: ', index);
            }}
          >
            <TabSwitcher.Tabs>
              {panes.map(({ isDisabled, name }) => (
                <TabSwitcher.Tab key={name} isDisabled={isDisabled}>
                  {name}
                </TabSwitcher.Tab>
              ))}
            </TabSwitcher.Tabs>
            <TabSwitcher.Panes>
              {panes.map(({ name, content }) => (
                <TabSwitcher.Pane key={name}>{content}</TabSwitcher.Pane>
              ))}
            </TabSwitcher.Panes>
          </TabSwitcher>
        )}
      </State>
    );
  });
