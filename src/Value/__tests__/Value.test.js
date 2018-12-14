import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import Value from '..';
import Theme from '../../Theme';

describe('<Value />', () => {
  it('should render withouth a problem', () => {
    const { container } = render(
      <ThemeProvider theme={Theme}>
        <Value>0</Value>
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as negative', () => {
    const { container } = render(
      <ThemeProvider theme={Theme}>
        <Value negative>-10</Value>
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as postive', () => {
    const { container } = render(
      <ThemeProvider theme={Theme}>
        <Value positive>+10</Value>
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
