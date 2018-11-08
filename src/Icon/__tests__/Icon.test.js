import React from 'react';
import 'jest-styled-components';

import Icon from '..';
import Theme from '../../Theme';

describe('<Icon />', () => {
  it('should render withouth a problem', () => {
    const render = mount(<Icon theme={Theme} name="calendar" />);
    expect(render).toMatchSnapshot();
  });

  it('should render with different name', () => {
    const render = mount(<Icon theme={Theme} name="check" />);
    expect(render).toMatchSnapshot();
  });

  it('should render with different size', () => {
    const render = mount(<Icon theme={Theme} name="calendar" witdth="2rem" height="2rem" />);
    expect(render).toMatchSnapshot();
  });

  it('should render with predifined color', () => {
    const render = mount(<Icon theme={Theme} name="calendar" color="darkBlue" />);
    expect(render).toMatchSnapshot();
  });

  it('should render with different color', () => {
    const render = mount(<Icon theme={Theme} name="calendar" color="hsl(120, 80%, 20%)" />);
    expect(render).toMatchSnapshot();
  });

  it('should render with a spin loader', () => {
    const render = mount(<Icon theme={Theme} name="calendar" spin />);
    expect(render).toMatchSnapshot();
  });
});
