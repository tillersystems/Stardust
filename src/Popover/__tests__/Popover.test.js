import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import Popover from '..';
import Theme from '../../Theme';

describe('<Popover />', () => {
  it('should render withouth a problem', () => {
    const render = mount(<Popover theme={Theme}>Children</Popover>);
    expect(render).toMatchSnapshot();
  });

  it('should render with a different width', () => {
    const render = mount(
      <Popover theme={Theme} width="10rem">
        Children
      </Popover>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render open popover withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Popover active>Children</Popover>
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
});
