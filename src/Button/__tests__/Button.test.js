import React from 'react';
import 'jest-styled-components';

import Button from '..';
import Icon from '../../Icon';
import Theme from '../../Theme';

describe('<Button />', () => {
  it('should render withouth a problem', () => {
    const render = mount(<Button theme={Theme}>Text</Button>);

    expect(render).toMatchSnapshot();
  });

  it('should render with another appearance', () => {
    const render = mount(
      <Button theme={Theme} appearance="primary">
        Text
      </Button>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render with a different size', () => {
    const render = mount(
      <Button theme={Theme} size="large">
        Text
      </Button>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render a fluid button', () => {
    const render = mount(
      <Button theme={Theme} fluid>
        Text
      </Button>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render with a type submit', () => {
    const render = mount(
      <Button theme={Theme} type="submit">
        Text
      </Button>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render a disabled button', () => {
    const render = mount(
      <Button theme={Theme} disabled>
        Text
      </Button>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render a left icon', () => {
    const icon = <Icon color={Theme.palette.white} name="calendar" />;
    const iconPosition = 'left';
    const render = mount(
      <Button theme={Theme} icon={icon} iconPosition={iconPosition}>
        Text
      </Button>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render a right icon', () => {
    const icon = <Icon color={Theme.palette.white} name="calendar" />;
    const iconPosition = 'right';
    const render = mount(
      <Button theme={Theme} icon={icon} iconPosition={iconPosition}>
        Text
      </Button>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should respond to a click handler', () => {
    const spy = jest.fn();
    const render = mount(
      <Button theme={Theme} onClick={spy}>
        Text
      </Button>,
    );

    render.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
