import React from 'react';
import 'jest-styled-components';

import UserInfo from '..';

describe('<UserInfo />', () => {
  it('should render withouth a problem', () => {
    const render = shallowWithTheme(<UserInfo name="Tony Starck" />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a user picture', () => {
    const render = shallowWithTheme(
      <UserInfo name="Tony Starck" pictureSrc="http://pictureSrc.com" />,
    );

    expect(render.dive()).toMatchSnapshot();
  });

  it('should trigger onClick function when user click', () => {
    const spy = jest.fn();
    const render = shallowWithTheme(
      <UserInfo name="Tony Starck" pictureSrc="http://pictureSrc.com" onClick={spy} />,
    );

    render
      .dive()
      .find('[data-test="DisconnectWrapper-test"]')
      .at(0)
      .simulate('click');

    expect(spy.mock.calls.length).toBe(1);
  });
});
