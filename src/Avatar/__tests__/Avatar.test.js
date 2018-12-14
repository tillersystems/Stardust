import React from 'react';

import Avatar from '..';

describe('<Avatar />', () => {
  test('should render withouth a problem', () => {
    const { container } = render(<Avatar name="James Bond" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a custom user image', () => {
    const { container } = render(<Avatar name="James Bond" src="http://urlofmyimage.com" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render withouth a custom size', () => {
    const { container } = render(
      <Avatar name="James Bond" size={4.1} src="http://urlofmyimage.com" />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
