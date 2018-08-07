import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { DateTime } from 'luxon';

import Week from '..';
import Theme from '../../../Theme';

describe('<Weeks />', () => {
  const dateValue = DateTime.fromObject({
    year: 2018,
    month: 7,
    day: 15,
    hour: 0,
    minute: 0,
    second: 0,
    zone: 'Europe/Paris',
  });

  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Week
          currentMonth={dateValue}
          onDateClick={() => {}}
          selectedDate={dateValue}
          minDate={dateValue}
        />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
});
