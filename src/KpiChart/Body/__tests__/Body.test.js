import React from 'react';

import Body from '..';

describe('<KpiChart.Body />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Body>Body</Body>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
