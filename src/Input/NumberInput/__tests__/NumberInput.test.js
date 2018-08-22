import React from 'react';
import 'jest-styled-components';

import NumberInput from '..';

describe('<NumberInput />', () => {
  let addEventListener = null;

  beforeEach(() => {
    addEventListener = document.addEventListener;
  });

  afterEach(() => {
    document.addEventListener = addEventListener;
  });

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

  it('should render withouth a problem when value changed', () => {
    const render = mountWithTheme(<NumberInput />);

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: '123' } });
    expect(render).toMatchSnapshot();
  });

  it('should call change handler when controlled and value changed', () => {
    const spy = jest.fn();
    const render = mountWithTheme(<NumberInput onChange={spy} />);

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: '123' } });

    expect(spy).toHaveBeenCalledWith(123);
  });

  it('should not call change handler when controlled and disabled and text changed', () => {
    const spy = jest.fn();

    const render = mountWithTheme(<NumberInput disabled onChange={spy} />);

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: 'hello' } });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render withouth a problem when given a width', () => {
    const render = mountWithTheme(<NumberInput width="123rem" />);
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when fluid', () => {
    const render = mountWithTheme(<NumberInput fluid />);
    expect(render).toMatchSnapshot();
  });

  it('should render input without problem when given an icon label', () => {
    const render = mountWithTheme(<NumberInput label={{ icon: 'cog' }} />);
    expect(render).toMatchSnapshot();
  });

  it('should render input without problem when given an icon label and label position', () => {
    const render = mountWithTheme(<NumberInput label={{ icon: 'cog' }} labelPosition="right" />);
    expect(render).toMatchSnapshot();
  });

  it('should render input without problem when given a text label', () => {
    const render = mountWithTheme(<NumberInput label={{ text: 'Pickle Rick' }} />);
    expect(render).toMatchSnapshot();
  });

  it('should render disabled without problem', () => {
    const render = mountWithTheme(<NumberInput disabled />);
    expect(render).toMatchSnapshot();
  });

  it('should render loading without problem', () => {
    const render = mountWithTheme(<NumberInput loading />);
    expect(render).toMatchSnapshot();
  });

  it('should render info without problem', () => {
    const render = mountWithTheme(<NumberInput info />);
    expect(render).toMatchSnapshot();
  });

  it('should render success without problem', () => {
    const render = mountWithTheme(<NumberInput success />);
    expect(render).toMatchSnapshot();
  });

  it('should render warning without problem', () => {
    const render = mountWithTheme(<NumberInput warning />);
    expect(render).toMatchSnapshot();
  });

  it('should render error without problem', () => {
    const render = mountWithTheme(<NumberInput error />);
    expect(render).toMatchSnapshot();
  });

  it('should update the component when controlled value is changed', () => {
    const render = mountWithTheme(<NumberInput />);

    expect(render).toMatchSnapshot();

    render.setProps({ value: 123 });
    expect(render).toMatchSnapshot();
  });

  it('should increase amount when focused and key up pressed', () => {
    let keyDownListener;
    document.addEventListener = jest.fn((event, listener) => {
      if (event === 'keydown') keyDownListener = listener;
    });

    const spy = jest.fn();
    const render = mountWithTheme(<NumberInput onChange={spy} />);

    if (!keyDownListener) throw new Error('Expected keyDownListener not to be undefined.');

    render.find('input').simulate('focus');
    keyDownListener({ code: 'ArrowUp' });
    expect(spy).toHaveBeenCalledWith(1);

    render.unmount();
  });

  it('should not increase amount when not focused and key up pressed', () => {
    let keyDownListener;
    document.addEventListener = jest.fn((event, listener) => {
      if (event === 'keydown') keyDownListener = listener;
    });

    const spy = jest.fn();
    mountWithTheme(<NumberInput onChange={spy} />);

    if (!keyDownListener) throw new Error('Expected keyDownListener not to be undefined.');

    keyDownListener({ code: 'ArrowUp' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should decrease amount when focused and key up pressed', () => {
    let keyDownListener;
    document.addEventListener = jest.fn((event, listener) => {
      if (event === 'keydown') keyDownListener = listener;
    });

    const spy = jest.fn();
    const render = mountWithTheme(<NumberInput onChange={spy} />);

    if (!keyDownListener) throw new Error('Expected keyDownListener not to be undefined.');

    render.find('input').simulate('focus');
    keyDownListener({ code: 'ArrowDown' });
    expect(spy).toHaveBeenCalledWith(-1);
  });

  it('should not decrease amount when not focused and key up pressed', () => {
    let keyDownListener;
    document.addEventListener = jest.fn((event, listener) => {
      if (event === 'keydown') keyDownListener = listener;
    });

    const spy = jest.fn();
    mountWithTheme(<NumberInput onChange={spy} />);

    if (!keyDownListener) throw new Error('Expected keyDownListener not to be undefined.');

    keyDownListener({ code: 'ArrowDown' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update value when a min is given a input is lower', () => {
    const spy = jest.fn();
    const render = mountWithTheme(<NumberInput min={456} onChange={spy} />);

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: '123' } });

    expect(spy).toHaveBeenCalledWith(456);
  });

  it('should update value when a max is given a input is greater', () => {
    const spy = jest.fn();
    const render = mountWithTheme(<NumberInput max={456} onChange={spy} />);

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: '789' } });

    expect(spy).toHaveBeenCalledWith(456);
  });
});
