import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';

import KpiBlock from '..';
import Theme from '../../Theme';

describe('<KpiBlock />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <KpiBlock title="title" value="value" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render with a positive variation value', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <KpiBlock title="title" value="value" variation={100} />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render with a negative variation value', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <KpiBlock title="title" value="value" variation={-100} />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
});
