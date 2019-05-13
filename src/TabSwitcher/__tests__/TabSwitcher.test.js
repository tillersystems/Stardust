import React from 'react';
import { fireEvent } from 'react-testing-library';

import TabSwitcher from '..';

describe('<TabSwitcher />', () => {
  test('should render without a problem', () => {
    const { getByText, getAllByText } = render(
      <TabSwitcher defaultTabId="tab-1">
        <TabSwitcher.Tabs>
          <TabSwitcher.Tab id="tab-1">I am active tab</TabSwitcher.Tab>
          <TabSwitcher.Tab id="tab-2">I am tab</TabSwitcher.Tab>
          <TabSwitcher.Tab id="tab-3">I am tab</TabSwitcher.Tab>
        </TabSwitcher.Tabs>
        <TabSwitcher.Panes>
          <TabSwitcher.Pane tabId="tab-1">content 1</TabSwitcher.Pane>
          <TabSwitcher.Pane tabId="tab-2">content 2</TabSwitcher.Pane>
          <TabSwitcher.Pane tabId="tab-3">content 3</TabSwitcher.Pane>
        </TabSwitcher.Panes>
      </TabSwitcher>,
    );

    const tabs = getAllByText(/I am/);
    const activeTabNode = getByText(/I am active/i);

    expect(tabs).toHaveLength(3);
    expect(activeTabNode).toHaveStyleRule('border-bottom', '3px solid hsl(200,74%,46%)');
    expect(activeTabNode).toHaveStyleRule('color', 'hsl(213,17%,20%)');

    const Panes = getAllByText(/content/);
    const activePane = getByText(/content 1/);

    expect(Panes).toHaveLength(1);
    expect(activePane).toBeInTheDocument();
  });

  test('should correctly display disabled tabs', () => {
    const { getByText } = render(
      <TabSwitcher defaultTabId="tab-1">
        <TabSwitcher.Tabs>
          <TabSwitcher.Tab id="tab-1">I am active tab</TabSwitcher.Tab>
          <TabSwitcher.Tab id="tab-2" isDisabled>
            I am disabled tab
          </TabSwitcher.Tab>
          <TabSwitcher.Tab id="tab-3">I am tab</TabSwitcher.Tab>
        </TabSwitcher.Tabs>
        <TabSwitcher.Panes>
          <TabSwitcher.Pane tabId="tab-1">content 1</TabSwitcher.Pane>
          <TabSwitcher.Pane tabId="tab-2">content 2</TabSwitcher.Pane>
          <TabSwitcher.Pane tabId="tab-3">content 3</TabSwitcher.Pane>
        </TabSwitcher.Panes>
      </TabSwitcher>,
    );

    const disabledTab = getByText(/I am disabled/);

    expect(disabledTab).toHaveStyleRule('color', 'hsl(206,23%,69%)');
  });

  describe('Uncontrolled mode: ', () => {
    test('should swicth tab on click', () => {
      const { getByText, getAllByText, queryByText } = render(
        <TabSwitcher defaultTabId="tab-1">
          <TabSwitcher.Tabs>
            <TabSwitcher.Tab id="tab-1">I am active tab</TabSwitcher.Tab>
            <TabSwitcher.Tab id="tab-2">I am tab</TabSwitcher.Tab>
            <TabSwitcher.Tab id="tab-3">I am tab</TabSwitcher.Tab>
          </TabSwitcher.Tabs>
          <TabSwitcher.Panes>
            <TabSwitcher.Pane tabId="tab-1">content 1</TabSwitcher.Pane>
            <TabSwitcher.Pane tabId="tab-2">content 2</TabSwitcher.Pane>
            <TabSwitcher.Pane tabId="tab-3">content 3</TabSwitcher.Pane>
          </TabSwitcher.Panes>
        </TabSwitcher>,
      );

      const activeTabNode = getByText(/I am active/i);
      const availableTabNodes = getAllByText(/I am tab/i);
      const activePane = getByText(/content 1/);
      const inactivePane = queryByText(/content 2/);

      expect(activeTabNode).toHaveStyleRule('border-bottom', '3px solid hsl(200,74%,46%)');
      expect(activeTabNode).toHaveStyleRule('color', 'hsl(213,17%,20%)');
      expect(availableTabNodes[0]).toHaveStyleRule('color', 'hsl(207,13%,45%)');
      expect(availableTabNodes[1]).toHaveStyleRule('color', 'hsl(207,13%,45%)');
      expect(activePane).toBeInTheDocument();
      expect(inactivePane).not.toBeInTheDocument();

      fireEvent.click(availableTabNodes[0]);

      const oldActiveTab = activeTabNode;
      const newActiveTab = availableTabNodes[0];
      const oldActivePane = activePane;
      const newActivePane = getByText(/content 2/);

      expect(newActiveTab).toHaveStyleRule('border-bottom', '3px solid hsl(200,74%,46%)');
      expect(oldActiveTab).toHaveStyleRule('color', 'hsl(207,13%,45%)');
      expect(newActivePane).toBeInTheDocument();
      expect(oldActivePane).not.toBeInTheDocument();
    });

    test('should not swicth tab if disabled', () => {
      const { getByText, getAllByText, queryByText } = render(
        <TabSwitcher defaultTabId="tab-1">
          <TabSwitcher.Tabs>
            <TabSwitcher.Tab id="tab-1">I am active tab</TabSwitcher.Tab>
            <TabSwitcher.Tab id="tab-2" isDisabled>
              I am tab
            </TabSwitcher.Tab>
            <TabSwitcher.Tab id="tab-3">I am tab</TabSwitcher.Tab>
          </TabSwitcher.Tabs>
          <TabSwitcher.Panes>
            <TabSwitcher.Pane tabId="tab-1">content 1</TabSwitcher.Pane>
            <TabSwitcher.Pane tabId="tab-2">content 2</TabSwitcher.Pane>
            <TabSwitcher.Pane tabId="tab-3">content 3</TabSwitcher.Pane>
          </TabSwitcher.Panes>
        </TabSwitcher>,
      );

      const activeTabNode = getByText(/I am active/i);
      const availableTabNodes = getAllByText(/I am tab/i);
      const activePane = getByText(/content 1/);
      const inactivePane = queryByText(/content 2/);

      expect(activeTabNode).toHaveStyleRule('border-bottom', '3px solid hsl(200,74%,46%)');
      expect(activeTabNode).toHaveStyleRule('color', 'hsl(213,17%,20%)');
      expect(availableTabNodes[0]).toHaveStyleRule('color', 'hsl(206,23%,69%)');
      expect(availableTabNodes[1]).toHaveStyleRule('color', 'hsl(207,13%,45%)');
      expect(activePane).toBeInTheDocument();
      expect(inactivePane).not.toBeInTheDocument();

      fireEvent.click(availableTabNodes[0]);

      expect(activeTabNode).toHaveStyleRule('border-bottom', '3px solid hsl(200,74%,46%)');
      expect(activeTabNode).toHaveStyleRule('color', 'hsl(213,17%,20%)');
      expect(availableTabNodes[0]).toHaveStyleRule('color', 'hsl(206,23%,69%)');
      expect(availableTabNodes[1]).toHaveStyleRule('color', 'hsl(207,13%,45%)');
      expect(activePane).toBeInTheDocument();
      expect(inactivePane).not.toBeInTheDocument();
    });
  });

  describe('Controlled mode: ', () => {
    test('should call onChange callback', () => {
      const spy = jest.fn();

      const { getAllByText } = render(
        <TabSwitcher tabId="tab-1" onChange={spy}>
          <TabSwitcher.Tabs>
            <TabSwitcher.Tab id="tab-1">I am active tab</TabSwitcher.Tab>
            <TabSwitcher.Tab id="tab-2">I am tab</TabSwitcher.Tab>
            <TabSwitcher.Tab id="tab-3">I am tab</TabSwitcher.Tab>
          </TabSwitcher.Tabs>
          <TabSwitcher.Panes>
            <TabSwitcher.Pane tabId="tab-1">content 1</TabSwitcher.Pane>
            <TabSwitcher.Pane tabId="tab-2">content 2</TabSwitcher.Pane>
            <TabSwitcher.Pane tabId="tab-3">content 3</TabSwitcher.Pane>
          </TabSwitcher.Panes>
        </TabSwitcher>,
      );
      const availableTabNodes = getAllByText(/I am tab/i);

      fireEvent.click(availableTabNodes[0]);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith('tab-2');
    });

    test('should not call onChange callback if tab is disabled ', () => {
      const spy = jest.fn();

      const { getAllByText } = render(
        <TabSwitcher tabId="tab-1" onChange={spy}>
          <TabSwitcher.Tabs>
            <TabSwitcher.Tab id="tab-1">I am active tab</TabSwitcher.Tab>
            <TabSwitcher.Tab id="tab-2" isDisabled>
              I am tab
            </TabSwitcher.Tab>
            <TabSwitcher.Tab id="tab-3">I am tab</TabSwitcher.Tab>
          </TabSwitcher.Tabs>
          <TabSwitcher.Panes>
            <TabSwitcher.Pane tabId="tab-1">content 1</TabSwitcher.Pane>
            <TabSwitcher.Pane tabId="tab-2">content 2</TabSwitcher.Pane>
            <TabSwitcher.Pane tabId="tab-3">content 3</TabSwitcher.Pane>
          </TabSwitcher.Panes>
        </TabSwitcher>,
      );
      const availableTabNodes = getAllByText(/I am tab/i);

      fireEvent.click(availableTabNodes[0]);

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});
