import React from 'react';
import 'jest-styled-components';

import OnWindowResize from '..';

describe('<OnWindowResize />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <OnWindowResize>{isResponsive => isResponsive && <div>test</div>}</OnWindowResize>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem with custom breakpoint', () => {
    const render = mount(
      <OnWindowResize breakpoint="md">
        {isResponsive => isResponsive && <div>test</div>}
      </OnWindowResize>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render withouth a problem with shouldComponentUpdate when true', () => {
    const render = mount(
      <OnWindowResize>{isResponsive => isResponsive && <div>test</div>}</OnWindowResize>,
    );
    render.setState({ isResponsive: false });
    const shouldupdate = render.instance().shouldComponentUpdate(null, { isResponsive: true });
    expect(shouldupdate).toEqual(true);
  });

  it('should render withouth a problem with shouldComponentUpdate when false', () => {
    const render = mount(
      <OnWindowResize>{isResponsive => isResponsive && <div>test</div>}</OnWindowResize>,
    );
    render.setState({ isResponsive: false });
    const shouldupdate = render.instance().shouldComponentUpdate(null, { isResponsive: false });
    expect(shouldupdate).toEqual(false);
  });

  it('should unmount without problems', () => {
    const render = mount(
      <OnWindowResize>{isResponsive => isResponsive && <div>test</div>}</OnWindowResize>,
    );
    render.instance().componentWillUnmount();
    expect(render).toMatchSnapshot();
  });

  it('should resize without problems', () => {
    const render = mount(
      <OnWindowResize>{isResponsive => isResponsive && <div>test</div>}</OnWindowResize>,
    );
    render.instance().onResize();
    expect(render).toMatchSnapshot();
  });
});
