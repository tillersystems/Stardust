import React from 'react';
import 'jest-styled-components';

import Increment from '..';
import { Button } from '../..';

describe('<Increment />', () => {
  it('should match snapshot', () => {
    const render = shallowWithTheme(<Increment />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should match snapshot when - button is clicked', () => {
    const render = mountWithTheme(
      <Increment step={1} max={100} min={0} appearance="secondary" width="5rem" />,
    );

    render
      .find(Button)
      .at(0)
      .simulate('click');

    expect(render).toMatchSnapshot();
  });

  it('should match snapshot when + button is clicked', () => {
    const render = mountWithTheme(
      <Increment step={1} max={100} min={0} appearance="secondary" width="5rem" />,
    );

    render
      .find(Button)
      .at(1)
      .simulate('click');

    expect(render).toMatchSnapshot();
  });
});
