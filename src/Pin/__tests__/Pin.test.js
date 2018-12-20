import React from 'react';

import Pin from '..';

describe('<Pin />', () => {
  test('should render pin without a problem', () => {
    const { container } = render(<Pin color="blue" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with custom size', () => {
    const size = '3rem';
    const { container } = render(<Pin color="blue" height={size} width={size} />);

    expect(container.firstChild).toHaveStyleRule('height', size);
    expect(container.firstChild).toHaveStyleRule('width', size);
  });
});
