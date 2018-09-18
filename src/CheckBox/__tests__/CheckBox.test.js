import React from 'react';
import 'jest-styled-components';

import CheckBox from '..';

describe('<CheckBox />', () => {
  it('should render without a problem', () => {
    const render = mountWithTheme(<CheckBox id="test" />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and enabled', () => {
    const render = mountWithTheme(<CheckBox id="test" defaultChecked />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and enabled', () => {
    const render = mountWithTheme(<CheckBox id="test" defaultChecked={false} />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and disabled', () => {
    const render = mountWithTheme(<CheckBox id="test" defaultChecked disabled />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and disabled', () => {
    const render = mountWithTheme(<CheckBox id="test" defaultChecked={false} disabled />);

    expect(render).toMatchSnapshot();
  });

  it('should call change handler when enabled', () => {
    const spy = jest.fn();
    const render = mountWithTheme(<CheckBox id="test" defaultChecked onChange={spy} />);

    render.simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should not call change handler when disabled', () => {
    const spy = jest.fn();
    const render = mountWithTheme(<CheckBox id="test" defaultChecked disabled onChange={spy} />);

    render.simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });
});
