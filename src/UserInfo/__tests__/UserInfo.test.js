import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import UserInfo from '..';
import Theme from '../../Theme';

describe('<UserInfo />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <UserInfo name="Tony Starck" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render a user picture', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <UserInfo name="Tony Starck" pictureSrc="http://pictureSrc.com" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should trigger onClick function when user click', () => {
    const spy = jest.fn();
    const render = mount(
      <ThemeProvider theme={Theme}>
        <UserInfo name="Tony Starck" pictureSrc="http://pictureSrc.com" onClick={spy} />
      </ThemeProvider>,
    );

    // console.log(render.debug());
    render
      .find('[data-test="DisconnectWrapper-test"]')
      .at(0)
      .simulate('click');

    expect(spy.mock.calls.length).toBe(1);
  });
});
