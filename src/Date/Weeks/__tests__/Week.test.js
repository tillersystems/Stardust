import React from 'react';
import 'jest-styled-components';
import { DateTime } from 'luxon';

import Week from '..';

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
    const render = shallowWithTheme(
      <Week
        currentMonth={dateValue}
        onDateClick={() => {}}
        selectedDate={dateValue}
        minDate={dateValue}
      />,
    );
    expect(render.dive()).toMatchSnapshot();
  });
});
