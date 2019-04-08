import React from 'react';
import { fireEvent } from 'react-testing-library';

import TabSwitcher from '..';

const panes = [
  {
    name: 'I am active',
    content: 'Content 1',
    isDisabled: false,
  },
  {
    name: 'I am disabled',
    content: 'Content 2',
    isDisabled: true,
  },
  {
    name: 'I am disabled too',
    content: 'Content 3',
    isDisabled: true,
  },
  {
    name: 'I am available',
    content: 'Content 4',
    isDisabled: false,
  },
];

describe('<TabSwitcher />', () => {
  test('should render without a problem', () => {
    const { getByText, queryAllByText } = render(
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
      </TabSwitcher>,
    );

    const tabs = queryAllByText(/I am/);
    const activeTabNode = getByText('I am active');
    const availableTabNode = getByText('I am available');

    expect(tabs).toHaveLength(4);
    expect(activeTabNode).toHaveStyleRule('border-bottom', '3px solid hsl(200,74%,46%)');
    expect(availableTabNode).toHaveStyleRule('color', 'hsl(207,13%,45%)');
  });

  test('should render the compacted version', () => {
    const { getByText } = render(
      <TabSwitcher isCompacted>
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
      </TabSwitcher>,
    );

    const activeTabNode = getByText('I am active');

    expect(activeTabNode).toHaveStyleRule('padding-bottom', '1.4rem');
  });

  test('should correctly display disabled tabs', () => {
    const { getAllByText } = render(
      <TabSwitcher>
        <TabSwitcher.Tabs>
          {panes.map(({ name, isDisabled }) => (
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
      </TabSwitcher>,
    );

    const disabledTabNodes = getAllByText(/I am disabled/);

    expect(disabledTabNodes[0]).toHaveStyleRule('color', 'hsl(206,23%,69%)');
    expect(disabledTabNodes[1]).toHaveStyleRule('color', 'hsl(206,23%,69%)');
  });

  describe('Uncontrolled mode: ', () => {
    test('should update tab on click', () => {
      const { getByText } = render(
        <TabSwitcher>
          <TabSwitcher.Tabs>
            {panes.map(({ name, isDisabled }) => (
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
        </TabSwitcher>,
      );

      const activeTabNode = getByText('I am active');
      const availableTabNode = getByText('I am available');

      expect(activeTabNode).toHaveStyleRule('border-bottom', '3px solid hsl(200,74%,46%)');
      expect(availableTabNode).toHaveStyleRule('color', 'hsl(207,13%,45%)');

      fireEvent.click(availableTabNode);

      expect(availableTabNode).toHaveStyleRule('border-bottom', '3px solid hsl(200,74%,46%)');
      expect(activeTabNode).toHaveStyleRule('color', 'hsl(207,13%,45%)');
    });
  });

  describe('Controlled mode: ', () => {
    test('should call onChange callback', () => {
      const spy = jest.fn();

      const { getByText } = render(
        <TabSwitcher onChange={spy} index={0}>
          <TabSwitcher.Tabs>
            {panes.map(({ name, isDisabled }) => (
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
        </TabSwitcher>,
      );

      const availableTabNode = getByText('I am available');

      fireEvent.click(availableTabNode);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(3);
    });
  });
});
