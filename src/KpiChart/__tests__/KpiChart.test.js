import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import KpiChart from '..';
import Theme from '../../Theme';

describe('<KpiChart />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <KpiChart title="title" reportTitle="reportTitle" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render with render props', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <KpiChart title="title" reportTitle="reportTitle" render={() => <p>Render Props</p>} />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
});
