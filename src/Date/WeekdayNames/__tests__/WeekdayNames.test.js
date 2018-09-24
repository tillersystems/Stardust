import React from 'react';
import 'jest-styled-components';

import WeekdayNames from '..';

describe('<WeekdayNames />', () => {
  it('should render withouth a problem', () => {
    const render = shallowWithTheme(<WeekdayNames />);

    expect(render.dive()).toMatchSnapshot();
  });
});
