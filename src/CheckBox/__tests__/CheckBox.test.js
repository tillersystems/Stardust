import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import CheckBox from '..';
import Theme from '../../Theme';

describe('<CheckBox />', () => {
  it('should render without a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <CheckBox id="test" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and enabled', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <CheckBox id="test" checked />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and enabled', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <CheckBox id="test" checked={false} />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and disabled', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <CheckBox id="test" checked disabled />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and disabled', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <CheckBox id="test" checked={false} disabled />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should call change handler when enabled', () => {
    const spy = jest.fn();
    const render = mount(
      <ThemeProvider theme={Theme}>
        <CheckBox id="test" checked onChange={spy} />
      </ThemeProvider>,
    );
    render.simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should not call change handler when disabled', () => {
    const spy = jest.fn();
    const render = mount(
      <ThemeProvider theme={Theme}>
        <CheckBox id="test" checked disabled onChange={spy} />
      </ThemeProvider>,
    );
    render.simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });
});
