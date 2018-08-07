import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import WeekdayNames from '..';
import Theme from '../../../Theme';

describe('<WeekdayNames />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <WeekdayNames />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
});
