import React from 'react';
import 'jest-styled-components';

import Counter from '..';
import { Button } from '../..';

describe('<Counter />', () => {
  it('should render withouth a problem', () => {
    const render = shallowWithTheme(<Counter />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should increment counter', () => {
    const render = mountWithTheme(
      <Counter step={1} max={100} min={0} countValue={0} appearance="secondary" width="5rem" />,
    );

    render
      .find(Button)
      .at(1)
      .simulate('click');

    const fakeinputValue = render
      .find('[data-test="fakeinput"]')
      .last()
      .text();

    expect(fakeinputValue).toEqual('1');
  });

  it('should decrement counter', () => {
    const render = mountWithTheme(
      <Counter step={1} max={100} min={0} countValue={10} appearance="secondary" width="5rem" />,
    );

    render
      .find(Button)
      .at(0)
      .simulate('click');

    const fakeinputValue = render
      .find('[data-test="fakeinput"]')
      .last()
      .text();

    expect(fakeinputValue).toEqual('9');
  });

  it('should decrement counter until the min value', () => {
    const render = mountWithTheme(
      <Counter step={1} max={100} min={0} countValue={99} appearance="secondary" width="5rem" />,
    );

    render
      .find(Button)
      .at(1)
      .simulate('click');

    const fakeinputValue = render
      .find('[data-test="fakeinput"]')
      .last()
      .text();

    expect(fakeinputValue).toEqual('100');

    render
      .find(Button)
      .at(1)
      .simulate('click');

    expect(fakeinputValue).toEqual('100');
  });

  it('should decrement counter until the min value', () => {
    const render = mountWithTheme(
      <Counter step={1} max={100} min={0} countValue={1} appearance="secondary" width="5rem" />,
    );

    render
      .find(Button)
      .at(0)
      .simulate('click');

    const fakeinputValue = render
      .find('[data-test="fakeinput"]')
      .last()
      .text();

    expect(fakeinputValue).toEqual('0');

    render
      .find(Button)
      .at(0)
      .simulate('click');

    expect(fakeinputValue).toEqual('0');
  });

  it('should call onIncrement callback function', () => {
    const spy = jest.fn();
    const render = mountWithTheme(
      <Counter
        step={1}
        max={100}
        min={0}
        onIncrement={spy}
        countValue={10}
        appearance="secondary"
        width="5rem"
      />,
    );

    render
      .find(Button)
      .at(1)
      .simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call onDecrement callback function', () => {
    const spy = jest.fn();
    const render = mountWithTheme(
      <Counter
        step={1}
        max={100}
        min={0}
        onDecrement={spy}
        countValue={10}
        appearance="secondary"
        width="5rem"
      />,
    );

    render
      .find(Button)
      .at(0)
      .simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
