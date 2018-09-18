import React from 'react';
import 'jest-styled-components';

import Button from '..';
import Icon from '../../Icon';
import Theme from '../../Theme';

describe('<Button />', () => {
  it('should render withouth a problem', () => {
    const render = mount(<Button theme={Theme}>Primary button</Button>);
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

  it('should render ghost button', () => {
    const render = mount(
      <Button ghost theme={Theme}>
        ghost button
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

  it('should render secondary button', () => {
    const render = mount(
      <Button secondary theme={Theme}>
        Secondary button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render success button', () => {
    const render = mount(
      <Button success theme={Theme}>
        Success button
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
        Primary big button
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

  it('should render with a left icon and a label', () => {
    const render = mount(
      <Button primary theme={Theme} icon={<Icon color={Theme.palette.white} name="maximize" />}>
        Icon button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render with a right icon and a label', () => {
    const render = mount(
      <Button
        primary
        theme={Theme}
        icon={<Icon color={Theme.palette.white} name="maximize" />}
        iconPosition="right"
      >
        Icon button
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render with an icon', () => {
    const render = mount(
      <Button primary theme={Theme}>
        <Icon color={Theme.palette.white} name="maximize" />
      </Button>,
    );
    expect(render).toMatchSnapshot();
  });
});
