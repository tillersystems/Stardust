import React from 'react';
import 'jest-styled-components';

import Tag from '..';

describe('<Tag />', () => {
  it('should render withouth a problem', () => {
    const render = shallowWithTheme(<Tag />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should have a color', () => {
    const render = shallowWithTheme(<Tag color="red" />);

    expect(render.dive()).toMatchSnapshot();
  });
});
