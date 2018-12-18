import React from 'react';

import Body from '..';

describe('<Modal.Body />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Body>Body</Body>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have a centered content', () => {
    const { container } = render(<Body center>Body</Body>);

    expect(container.firstChild).toHaveStyleRule('margin', 'auto');
  });
});
