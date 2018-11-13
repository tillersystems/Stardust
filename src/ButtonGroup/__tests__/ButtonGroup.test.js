import React from 'react';
import 'jest-styled-components';

import { Button, ButtonGroup } from '../..';

describe('<ButtonGroup />', () => {
  it('should render withouth a problem', () => {
    const render = mountWithTheme(
      <ButtonGroup>
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render with a defaultActiveButton', () => {
    const render = mountWithTheme(
      <ButtonGroup defaultActiveButton="ON">
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render a primary ButtonGroup', () => {
    const render = mountWithTheme(
      <ButtonGroup primary>
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render a secondary ButtonGroup', () => {
    const render = mountWithTheme(
      <ButtonGroup secondary>
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render a success ButtonGroup', () => {
    const render = mountWithTheme(
      <ButtonGroup success>
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render a failure ButtonGroup', () => {
    const render = mountWithTheme(
      <ButtonGroup failure>
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render a big ButtonGroup', () => {
    const render = mountWithTheme(
      <ButtonGroup big>
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render a disabled ButtonGroup', () => {
    const render = mountWithTheme(
      <ButtonGroup disabled>
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render a fluid ButtonGroup', () => {
    const render = mountWithTheme(
      <ButtonGroup fluid>
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should call onchange callback', () => {
    const spy = jest.fn();
    const render = mountWithTheme(
      <ButtonGroup onChange={spy}>
        <Button name="foo">foo</Button>
        <Button name="bar">bar</Button>
      </ButtonGroup>,
    );

    render
      .find('button')
      .first()
      .simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('foo');
  });
});
