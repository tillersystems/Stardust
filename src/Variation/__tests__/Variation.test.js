import React from 'react';

import Variation from '..';
import Theme from '../../Theme';

describe('<Variation />', () => {
  test('should render withouth a problem', () => {
    const { container } = render(<Variation />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render as negative', () => {
    const { container } = render(<Variation negative />);

    expect(container.firstChild).toHaveStyleRule('padding-top', '0.6rem');
    expect(container.firstChild).toHaveStyleRule('background', Theme.palette.failure.back);
  });
});
