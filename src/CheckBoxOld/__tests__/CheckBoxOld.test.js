import React from 'react';
import 'jest-styled-components';

import CheckBoxOld from '..';

describe('<CheckBoxOld />', () => {
  it('should render without a problem', () => {
    const render = mountWithTheme(<CheckBoxOld id="test" />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and enabled', () => {
    const render = mountWithTheme(<CheckBoxOld id="test" checked />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and enabled', () => {
    const render = mountWithTheme(<CheckBoxOld id="test" checked={false} />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and disabled', () => {
    const render = mountWithTheme(<CheckBoxOld id="test" checked disabled />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and disabled', () => {
    const render = mountWithTheme(<CheckBoxOld id="test" checked={false} disabled />);

    expect(render).toMatchSnapshot();
  });

  it('should call change handler when enabled', () => {
    const spy = jest.fn();
    const render = mountWithTheme(<CheckBoxOld id="test" checked onChange={spy} />);

    render.simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should not call change handler when disabled', () => {
    const spy = jest.fn();
    const render = mountWithTheme(<CheckBoxOld id="test" checked disabled onChange={spy} />);

    render.simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });
});
