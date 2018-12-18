import React from 'react';
import 'jest-styled-components';

import Tag from '..';

describe('<Tag />', () => {
  test('should render withouth a problem', () => {
    const { container } = render(<Tag />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have a color', () => {
    const { getByTestId } = render(<Tag color="red" />);

    expect(getByTestId('tag')).toHaveStyleRule('background', 'red');
  });
});
