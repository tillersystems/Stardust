import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import Value from '..';
import Theme from '../../Theme';

describe('<Value />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Value>0</Value>
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render with as negative', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Value negative>-10</Value>
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render with as negative', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Value postive>+10</Value>
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
});
