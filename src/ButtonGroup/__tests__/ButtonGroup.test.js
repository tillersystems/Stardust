import React from 'react';
import 'jest-styled-components';

import { Button, ButtonGroup } from '../..';
import Theme from '../../Theme';

describe('<ButtonGroup />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <ButtonGroup theme={Theme}>
        <Button theme={Theme} name="ON" appearance="secondary">
          ON
        </Button>
        <Button theme={Theme} name="OFF" appearance="secondary">
          OFF
        </Button>
      </ButtonGroup>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render with a default value', () => {
    const render = mount(
      <ButtonGroup theme={Theme} defaultActiveButton="ON">
        <Button theme={Theme} name="ON" appearance="secondary">
          ON
        </Button>
        <Button theme={Theme} name="OFF" appearance="secondary">
          OFF
        </Button>
      </ButtonGroup>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render with a default value', () => {
    const render = mount(
      <ButtonGroup theme={Theme} defaultActiveButton="ON">
        <Button theme={Theme} name="ON" appearance="secondary">
          ON
        </Button>
        <Button theme={Theme} name="OFF" appearance="secondary">
          OFF
        </Button>
      </ButtonGroup>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should not clone child if disabled', () => {
    const render = mount(
      <ButtonGroup theme={Theme} defaultActiveButton="ON">
        <Button theme={Theme} name="ON" appearance="secondary">
          ON
        </Button>
        <Button theme={Theme} name="OFF" appearance="secondary" disabled>
          OFF
        </Button>
      </ButtonGroup>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should not clone child if not a button element', () => {
    const render = mount(
      <ButtonGroup theme={Theme} defaultActiveButton="ON">
        <div name="ON">ON</div>
        <div name="OFF">OFF</div>
      </ButtonGroup>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should respond to a click handler', () => {
    const spy = jest.fn();
    const render = mount(
      <ButtonGroup theme={Theme} defaultActiveButton="ON" onChange={spy}>
        <Button theme={Theme} name="ON" appearance="secondary">
          ON
        </Button>
        <Button theme={Theme} name="OFF" appearance="secondary">
          OFF
        </Button>
      </ButtonGroup>,
    );

    render
      .find(Button)
      .last()
      .simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call the onclick handler on child button', () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    const render = mount(
      <ButtonGroup theme={Theme} defaultActiveButton="ON" onChange={spy}>
        <Button theme={Theme} name="ON" appearance="secondary">
          ON
        </Button>
        <Button theme={Theme} name="OFF" appearance="secondary" onClick={spy2}>
          OFF
        </Button>
      </ButtonGroup>,
    );

    render
      .find(Button)
      .last()
      .simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if child has not name props', () => {
    let error;
    try {
      const render = mount(
        <ButtonGroup theme={Theme} defaultActiveButton="ON">
          <Button theme={Theme} appearance="secondary">
            ON
          </Button>
          <Button theme={Theme} appearance="secondary">
            OFF
          </Button>
        </ButtonGroup>,
      );
      expect(render).toMatchSnapshot();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });
});
