import React from 'react';
import 'jest-styled-components';

import Avatar from '..';

describe('<Avatar />', () => {
  it('should render withouth a problem', () => {
    const render = shallowWithTheme(<Avatar name="James Bond" />);
    expect(render.dive()).toMatchSnapshot();
  });

  it('should render with a custom user image', () => {
    const render = shallowWithTheme(<Avatar name="James Bond" src="http://urlofmyimage.com" />);
    expect(render.dive()).toMatchSnapshot();
  });

  it('should render withouth a custom size', () => {
    const render = shallowWithTheme(<Avatar name="James Bond" size={4.1} />);
    expect(render.dive()).toMatchSnapshot();
  });
});
