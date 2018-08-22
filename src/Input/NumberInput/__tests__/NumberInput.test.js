import React from 'react';
import 'jest-styled-components';

import NumberInput from '..';

describe('<NumberInput />', () => {
  it('should render withouth a problem', () => {
    const render = mountWithTheme(<NumberInput />);
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when focused and unfocused', () => {
    const render = mountWithTheme(<NumberInput />);

    render.find('input').simulate('focus');
    expect(render).toMatchSnapshot();

    render.find('input').simulate('blur');
    expect(render).toMatchSnapshot();
  });
});
