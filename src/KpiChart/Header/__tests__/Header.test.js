import React from 'react';

import Header from '..';

describe('<KpiChart.Header />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Header>Header</Header>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
