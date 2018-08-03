import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';

import ToggleButton from '..';
import Theme from '../../Theme';

describe('<ToggleButton />', () => {
  it('should render without a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <ToggleButton />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and disabled', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <ToggleButton checked disabled />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and disabled', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <ToggleButton checked={false} disabled />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and not disabled', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <ToggleButton checked disabled={false} />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and not disabled', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <ToggleButton checked={false} disabled={false} />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should call change handler when enabled', () => {
    const handleToggleMock = jest.fn();
    const render = mount(
      <ThemeProvider theme={Theme}>
        <ToggleButton checked enabled onToggle={handleToggleMock} />
      </ThemeProvider>,
    );
    render.find('ToggleButton').simulate('click');

    expect(handleToggleMock).toHaveBeenCalled();
  });

  it('should not call change handler when disabled', () => {
    const handleToggleMock = jest.fn();
    const render = mount(
      <ThemeProvider theme={Theme}>
        <ToggleButton checked disabled onToggle={handleToggleMock} />
      </ThemeProvider>,
    );
    render.find('ToggleButton').simulate('click');

    expect(handleToggleMock).not.toHaveBeenCalled();
  });
});
