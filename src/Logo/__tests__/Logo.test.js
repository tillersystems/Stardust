import React from 'react';
import 'jest-styled-components';

import Logo from '..';

describe('<Logo />', () => {
  it('should render withouth a problem', () => {
    const render = shallowWithTheme(<Logo />);
    expect(render).toMatchSnapshot();
  });

  it('should render with custom width & height', () => {
    const render = shallowWithTheme(<Logo width="300" height="80" />);
    expect(render).toMatchSnapshot();
  });

  it('should render with custom color', () => {
    const render = shallowWithTheme(<Logo color="hsl(217, 89%, 61%)" />);
    expect(render).toMatchSnapshot();
  });
});
