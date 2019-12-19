import React from 'react';

import Status from '..';

describe('<Status />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Status status="info" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have different width and height on icon', () => {
    const { container } = render(<Status status="search" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have different color on icon', () => {
    const { container } = render(<Status status="loading" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
