import React from 'react';

import Footer from '..';

describe('<Modal.Footer />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Footer>Footer</Footer>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with another alignment', () => {
    const { container } = render(<Footer alignment="center">Footer</Footer>);

    expect(container.firstChild).toHaveStyleRule('justify-content', 'center');
  });
});
