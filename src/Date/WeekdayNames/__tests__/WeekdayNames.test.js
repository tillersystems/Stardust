import React from 'react';

import WeekdayNames from '..';

describe('<WeekdayNames />', () => {
  test('should render withouth a problem', () => {
    const { container } = render(<WeekdayNames />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a different locale', () => {
    const { container } = render(<WeekdayNames locale="ar" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
