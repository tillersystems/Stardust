import React from 'react';

import Footer from '..';

describe('<KpiChart.Footer />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Footer>Footer</Footer>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
