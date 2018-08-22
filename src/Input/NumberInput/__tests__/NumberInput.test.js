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

    expect(spy.mock.calls[0][0]).toBe(123);
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
});
