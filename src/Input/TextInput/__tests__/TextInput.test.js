import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';

import TextInput from '..';
import Theme from '../../../Theme';

describe('<Input />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput placeHolder="default input" id="test" tabIndex="0" value="" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when focused and unfocuse', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput />
      </ThemeProvider>,
    );

    render.find('input').simulate('focus');

    expect(render).toMatchSnapshot();

    render.find('input').simulate('blur');

    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when text changed', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput />
      </ThemeProvider>,
    );

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: 'hello' } });

    expect(render).toMatchSnapshot();
  });

  it('should call change handler when controlled and text changed', () => {
    const spy = jest.fn();

    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput onChange={spy} />
      </ThemeProvider>,
    );

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: 'hello' } });

    expect(spy.mock.calls[0][0]).toBe('hello');
  });

  it('should not call change handler when controlled and disabled and text changed', () => {
    const spy = jest.fn();

    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput disabled onChange={spy} />
      </ThemeProvider>,
    );

    render
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { name: 'input', value: 'hello' } });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render withouth a problem when given a width', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput width="123rem" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when fluid', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput fluid />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem when given a type', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput password value="" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render input without problem when given a label', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput value="" label="cog" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render input without problem when given a label and label position', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput value="" label="cog" labelPosition="right" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render disabled without problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput disabled value="" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render loading without problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput loading value="" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render info without problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput info value="" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render success without problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput success value="" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render warning without problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput warning value="" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render error without problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput error value="" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render search without problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput search value="" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render search without problem when focused', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <TextInput search value="" />
      </ThemeProvider>,
    );

    render.find('input').simulate('focus');

    expect(render).toMatchSnapshot();
  });
});
