import React from 'react';
import 'jest-styled-components';
import { DateTime } from 'luxon';

import Day from '..';

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
    const render = mountWithTheme(<Day date={dateValue} />);

    expect(render).toMatchSnapshot();
  });
});
