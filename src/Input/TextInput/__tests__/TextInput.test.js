import React from 'react';
import 'jest-styled-components';

import { TextInput } from '../../..';

describe('<TextInput />', () => {
  it('should render withouth a problem', () => {
    const render = mountWithTheme(
      <TextInput placeHolder="default input" id="test" tabIndex="0" value="" />,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when focused and unfocused', () => {
    const render = mountWithTheme(<TextInput />);

    render.find('input').simulate('focus');
    expect(render).toMatchSnapshot();

    render.find('input').simulate('blur');
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when text changed', () => {
    const render = mountWithTheme(<TextInput />);

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: 'hello' } });

    expect(render).toMatchSnapshot();
  });

  it('should call change handler when controlled and text changed', () => {
    const spy = jest.fn();

    const render = mountWithTheme(<TextInput onChange={spy} />);

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: 'hello' } });

    expect(spy.mock.calls[0][0]).toBe('hello');
  });

  it('should not call change handler when controlled and disabled and text changed', () => {
    const spy = jest.fn();

    const render = mountWithTheme(<TextInput disabled onChange={spy} />);

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: 'hello' } });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render withouth a problem when given a width', () => {
    const render = mountWithTheme(<TextInput width="123rem" />);
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when fluid', () => {
    const render = mountWithTheme(<TextInput fluid />);
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when given a type', () => {
    const render = mountWithTheme(<TextInput password value="" />);
    expect(render).toMatchSnapshot();
  });

  it('should render input without problem when given an icon label', () => {
    const render = mountWithTheme(<TextInput value="" label={{ icon: 'cog' }} />);
    expect(render).toMatchSnapshot();
  });

  it('should render input without problem when given an icon label and label position', () => {
    const render = mountWithTheme(
      <TextInput value="" label={{ icon: 'cog' }} labelPosition="right" />,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render input without problem when given a text label', () => {
    const render = mountWithTheme(<TextInput value="" label={{ text: 'Pickle Rick' }} />);
    expect(render).toMatchSnapshot();
  });

  it('should render disabled without problem', () => {
    const render = mountWithTheme(<TextInput disabled value="" />);
    expect(render).toMatchSnapshot();
  });

  it('should render loading without problem', () => {
    const render = mountWithTheme(<TextInput loading value="" />);
    expect(render).toMatchSnapshot();
  });

  it('should render info without problem', () => {
    const render = mountWithTheme(<TextInput info value="" />);
    expect(render).toMatchSnapshot();
  });

  it('should render success without problem', () => {
    const render = mountWithTheme(<TextInput success value="" />);
    expect(render).toMatchSnapshot();
  });

  it('should render warning without problem', () => {
    const render = mountWithTheme(<TextInput warning value="" />);
    expect(render).toMatchSnapshot();
  });

  it('should render error without problem', () => {
    const render = mountWithTheme(<TextInput error value="" />);
    expect(render).toMatchSnapshot();
  });

  it('should render ghost input without problem', () => {
    const render = mountWithTheme(<TextInput ghost value="" />);
    expect(render).toMatchSnapshot();
  });

  it('should render search without problem', () => {
    const render = mountWithTheme(<TextInput search value="" />);
    expect(render).toMatchSnapshot();
  });

  it('should render search without problem when focused', () => {
    const render = mountWithTheme(<TextInput search value="" />);

    render.find('input').simulate('focus');

    expect(render).toMatchSnapshot();
  });

  it('should update the component when controlled value is changed', () => {
    const render = mountWithTheme(<TextInput search value="" />);

    expect(render).toMatchSnapshot();
    render.setProps({ value: '@test@ ' });
    expect(render).toMatchSnapshot();
  });
});
