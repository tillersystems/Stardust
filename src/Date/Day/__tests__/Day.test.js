import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { DateTime } from 'luxon';

import Day from '..';
import Theme from '../../../Theme';

describe('Day', () => {
  it('should render with no problem', () => {
    const dateValue = DateTime.fromObject({
      year: 2018,
      month: 7,
      day: 15,
      hour: 0,
      minute: 0,
      second: 0,
      zone: 'Europe/Paris',
    });

    const render = mount(
      <ThemeProvider theme={Theme}>
        <Day date={dateValue} />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
});
