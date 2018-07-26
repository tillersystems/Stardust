import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Avatar from '..';
import Theme from '../../Theme';

describe('<Avatar />', () => {
  it('should render withouth a problem', () => {
    const render = mount(<Avatar theme={Theme} name="James Bond" />);
    expect(render).toMatchSnapshot();
  });

  it('should render with a custom user image', () => {
    const render = mount(<Avatar theme={Theme} name="James Bond" src="http://urlofmyimage.com" />);
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a custom size', () => {
    const render = mount(<Avatar theme={Theme} name="James Bond" size={4.1} />);
    expect(render).toMatchSnapshot();
  });
});
