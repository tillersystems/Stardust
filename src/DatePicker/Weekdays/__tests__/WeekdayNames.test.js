import React from 'react';

import Weekdays from '..';

describe('<Weekdays />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Weekdays />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a different locale', () => {
    const { container } = render(<Weekdays locale="fr" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
