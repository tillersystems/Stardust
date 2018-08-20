import React from 'react';
import 'jest-styled-components';

import WeekdayNames from '..';

describe('<WeekdayNames />', () => {
  it('should render withouth a problem', () => {
    const render = mountWithTheme(<WeekdayNames />);

    expect(render).toMatchSnapshot();
  });
});
