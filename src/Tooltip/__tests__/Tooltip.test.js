import React from 'react';
import 'jest-styled-components';

import Tooltip from '..';

describe('<Tooltip />', () => {
  it('should render withouth a problem', () => {
    const render = shallowWithTheme(
      <Tooltip
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    expect(render.dive()).toMatchSnapshot();
  });

  it('should render with a different width', () => {
    const render = shallowWithTheme(
      <Tooltip
        width="40rem"
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a tooltip which can be displayed on hover', () => {
    const render = shallowWithTheme(
      <Tooltip
        hover
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a tooltip  displayed above the element', () => {
    const render = shallowWithTheme(
      <Tooltip
        top
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    expect(render.dive()).toMatchSnapshot();
  });

  it('should render open popover withouth a problem', () => {
    const render = shallowWithTheme(
      <Tooltip
        active
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );

    expect(render.dive()).toMatchSnapshot();
  });

  it('should call componentDidUpdate when props are updated', () => {
    let activeValue = false;
    const render = shallowWithTheme(
      <Tooltip
        active={activeValue}
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    render.setProps({ active: true });
    expect(render.state().active).toEqual(true);
  });

  it('should call click handler', () => {
    const render = shallowWithTheme(
      <Tooltip
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button" id="btn">
          Show Tooltip
        </button>
      </Tooltip>,
    );
    render.find('#btn').simulate('click');
    expect(render.state().active).toEqual(true);
  });

  it('should call hover handler', () => {
    const render = mountWithTheme(
      <Tooltip
        hover
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button" id="btn">
          Show Tooltip
        </button>
      </Tooltip>,
    );
    render.find('#btn').simulate('mouseenter');
    expect(render.state().active).toEqual(true);
    render.find('#btn').simulate('mouseleave');
    expect(render.state().active).toEqual(false);
  });
});
