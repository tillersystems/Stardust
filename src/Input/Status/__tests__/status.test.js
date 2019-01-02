import React from 'react';

import Status from '..';
import Theme from '../../../Theme';

describe('<Status />', () => {
  test('should render withouth a problem', () => {
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

  test('should have different background when focused & have a search status', () => {
    const { container } = render(<Status status="search" hasFocus />);

    expect(container.firstChild).toHaveStyleRule('background', Theme.palette.primary.default);
  });
});
