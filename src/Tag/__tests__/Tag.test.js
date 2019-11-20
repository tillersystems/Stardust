import React from 'react';
import 'jest-styled-components';

import Tag from '..';

describe('<Tag />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Tag>Beta</Tag>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have a color', () => {
    const { getByText } = render(<Tag color="red">Beta</Tag>);

    expect(getByText('Beta')).toHaveStyleRule('background', 'red');
  });
});
