import React from 'react';
import 'jest-styled-components';

import ButtonRefactor from '..';
import Theme from '../../Theme';

describe('<ButtonRefactor />', () => {
  it('should render withouth a problem', () => {
    const render = mount(<ButtonRefactor theme={Theme}>Primary button</ButtonRefactor>);
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem and with margin', () => {
    const render = mount(
      <ButtonRefactor marginLeft theme={Theme}>
        Primary margin button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render google button', () => {
    const render = mount(
      <ButtonRefactor isGoogle theme={Theme}>
        Google button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render ghost button', () => {
    const render = mount(
      <ButtonRefactor ghost theme={Theme}>
        ghost button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render primary button', () => {
    const render = mount(
      <ButtonRefactor primary theme={Theme}>
        Primary button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render success button', () => {
    const render = mount(
      <ButtonRefactor success theme={Theme}>
        Secondary button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render failure button', () => {
    const render = mount(
      <ButtonRefactor failure theme={Theme}>
        Failure button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render light button', () => {
    const render = mount(
      <ButtonRefactor light theme={Theme}>
        Light button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as small', () => {
    const render = mount(
      <ButtonRefactor primary small theme={Theme}>
        Primary small button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as big', () => {
    const render = mount(
      <ButtonRefactor primary big theme={Theme}>
        Primary small button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as medium', () => {
    const render = mount(
      <ButtonRefactor primary medium theme={Theme}>
        Primary small button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as fluid', () => {
    const render = mount(
      <ButtonRefactor primary fluid theme={Theme}>
        Primary fluid button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render as disabled', () => {
    const render = mount(
      <ButtonRefactor primary disabled theme={Theme}>
        Disabled button
      </ButtonRefactor>,
    );
    expect(render).toMatchSnapshot();
  });
});
