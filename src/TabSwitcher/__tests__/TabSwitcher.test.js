import React from 'react';
import 'jest-styled-components';

import { TabSwitcher, TabList, Tab, TabPanels, TabPanel } from '../..';

describe('<TabSwitcher />', () => {
  it('should render without a problem', () => {
    const render = mountWithTheme(
      <TabSwitcher defaultActiveTabId="alfa">
        <TabList>
          <Tab id="alfa">Alfa</Tab>
          <Tab id="bravo">Bravo</Tab>
        </TabList>

        <TabPanels>
          <TabPanel whenActive="alfa">
            <div>Alfa Tab</div>
          </TabPanel>
          <TabPanel whenActive="bravo">
            <div>Bravo Tab</div>
          </TabPanel>
        </TabPanels>
      </TabSwitcher>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render with no <Tabpanels> border', () => {
    const render = mountWithTheme(
      <TabSwitcher defaultActiveTabId="alfa">
        <TabList>
          <Tab id="alfa">Alfa</Tab>
          <Tab id="bravo">Bravo</Tab>
        </TabList>

        <TabPanels noBorder>
          <TabPanel whenActive="alfa">
            <div>Alfa Tab</div>
          </TabPanel>
          <TabPanel whenActive="bravo">
            <div>Bravo Tab</div>
          </TabPanel>
        </TabPanels>
      </TabSwitcher>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render with no <Tabpanels> background', () => {
    const render = mountWithTheme(
      <TabSwitcher defaultActiveTabId="alfa">
        <TabList>
          <Tab id="alfa">Alfa</Tab>
          <Tab id="bravo">Bravo</Tab>
        </TabList>

        <TabPanels noBackground>
          <TabPanel whenActive="alfa">
            <div>Alfa Tab</div>
          </TabPanel>
          <TabPanel whenActive="bravo">
            <div>Bravo Tab</div>
          </TabPanel>
        </TabPanels>
      </TabSwitcher>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should switch to another tab', () => {
    const render = mountWithTheme(
      <TabSwitcher defaultActiveTabId="alfa">
        <TabList>
          <Tab id="alfa">Alfa</Tab>
          <Tab id="bravo">Bravo</Tab>
        </TabList>

        <TabPanels noBackground>
          <TabPanel whenActive="alfa">
            <div>Alfa Tab</div>
          </TabPanel>
          <TabPanel whenActive="bravo">
            <div>Bravo Tab</div>
          </TabPanel>
        </TabPanels>
      </TabSwitcher>,
    );

    render
      .find('#bravo')
      .find('div')
      .first()
      .simulate('click');

    expect(render).toMatchSnapshot();

    render
      .find('#bravo')
      .find('div')
      .first()
      .simulate('keyPress', { key: 'Enter' });

    expect(render).toMatchSnapshot();
  });
});
