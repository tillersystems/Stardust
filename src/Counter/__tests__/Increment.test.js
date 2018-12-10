import React from 'react';
import 'jest-styled-components';

import Counter from '..';
import { Button } from '../..';

describe('<Counter />', () => {
  it('should match snapshot', () => {
    const render = shallowWithTheme(<Counter />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should match snapshot when - button is clicked', () => {
    const render = mountWithTheme(
      <Counter step={1} max={100} min={0} appearance="secondary" width="5rem" />,
    );

    render
      .find(Button)
      .at(0)
      .simulate('click');

    expect(render).toMatchSnapshot();
  });

  it('should match snapshot when + button is clicked', () => {
    const render = mountWithTheme(
      <Counter step={1} max={100} min={0} appearance="secondary" width="5rem" />,
    );

    render
      .find(Button)
      .at(1)
      .simulate('click');

    expect(render).toMatchSnapshot();
  });
});
