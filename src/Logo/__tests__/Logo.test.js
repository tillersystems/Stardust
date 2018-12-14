import React from 'react';
import 'jest-styled-components';

import Logo from '..';

describe('<Logo />', () => {
  it('should render withouth a problem', () => {
    const { container } = render(<Logo />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with custom width & height', () => {
    const { container } = render(<Logo width="300" height="80" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with custom color', () => {
    const { container } = render(<Logo color="hsl(217, 89%, 61%)" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
