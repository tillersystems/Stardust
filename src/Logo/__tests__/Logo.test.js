import React from 'react';
import 'jest-styled-components';

import Logo from '..';
import Theme from '../../Theme';

describe('<Logo />', () => {
  it('should render withouth a problem', () => {
    const render = mount(<Logo theme={Theme} />);
    expect(render).toMatchSnapshot();
  });

  it('should render with custom width & height', () => {
    const render = mount(<Logo theme={Theme} width="300" height="80" />);
    expect(render).toMatchSnapshot();
  });

  it('should render with custom color', () => {
    const render = mount(<Logo theme={Theme} color="hsl(217, 89%, 61%)" />);
    expect(render).toMatchSnapshot();
  });
});
