import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Button from '..';
import Theme from '../../Theme';

describe('<Button />', () => {
  it('should render withouth a problem', () => {
    const render = mount(<Button theme={Theme}>Primary button</Button>);
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem and with margin', () => {
    const render = mount(
      <Button marginLeft theme={Theme}>
        Primary margin button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render google button', () => {
    const render = mount(
      <Button isGoogle theme={Theme}>
        Google button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render primary button', () => {
    const render = mount(
      <Button primary theme={Theme}>
        Primary button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render primary inverted button', () => {
    const render = mount(
      <Button primary inverted theme={Theme}>
        Primary Inverted button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render secondary button', () => {
    const render = mount(
      <Button secondary theme={Theme}>
        Secondary button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render secondary inverted button', () => {
    const render = mount(
      <Button secondary inverted theme={Theme}>
        Secondary Inverted button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render success button', () => {
    const render = mount(
      <Button success theme={Theme}>
        Secondary button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render success inverted button', () => {
    const render = mount(
      <Button success inverted theme={Theme}>
        Secondary Inverted button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render failure button', () => {
    const render = mount(
      <Button failure theme={Theme}>
        Failure button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render failure inverted button', () => {
    const render = mount(
      <Button failure inverted theme={Theme}>
        Failure Inverted button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render light button', () => {
    const render = mount(
      <Button light theme={Theme}>
        Light button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render light inverted button', () => {
    const render = mount(
      <Button light inverted theme={Theme}>
        Light Inverted button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as small', () => {
    const render = mount(
      <Button primary small theme={Theme}>
        Primary small button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as big', () => {
    const render = mount(
      <Button primary big theme={Theme}>
        Primary small button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as medium', () => {
    const render = mount(
      <Button primary medium theme={Theme}>
        Primary small button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as tiny', () => {
    const render = mount(
      <Button primary tiny theme={Theme}>
        Primary tiny button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as inverted', () => {
    const render = mount(
      <Button primary inverted theme={Theme}>
        Primary small button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as fluid', () => {
    const render = mount(
      <Button primary fluid theme={Theme}>
        Primary fluid button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as disabled', () => {
    const render = mount(
      <Button primary disabled theme={Theme}>
        Disabled button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as rounded', () => {
    const render = mount(
      <Button primary rounded theme={Theme}>
        Rounded button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as rounded and small', () => {
    const render = mount(
      <Button primary small rounded theme={Theme}>
        Small rounded button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as rounded and big', () => {
    const render = mount(
      <Button primary big rounded theme={Theme}>
        Big rounded button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as rounded and medium', () => {
    const render = mount(
      <Button primary medium rounded theme={Theme}>
        Big rounded button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as rounded and tiny', () => {
    const render = mount(
      <Button primary tiny rounded theme={Theme}>
        Big rounded button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });
});
