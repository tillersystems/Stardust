import React from 'react';
import 'jest-styled-components';

import CheckBox from '..';

describe('<CheckBox />', () => {
  it('should render without a problem', () => {
    const render = mountWithTheme(<CheckBox />);

    expect(render).toMatchSnapshot();
  });

  it('should render an initial selected checkbox', () => {
    const render = mountWithTheme(<CheckBox defaultChecked />);

    expect(render).toMatchSnapshot();
  });
  it('should be disabled', () => {
    const render = mountWithTheme(<CheckBox disabled />);

    expect(render).toMatchSnapshot();
  });

  it('should be checked with change', () => {
    const render = mountWithTheme(<CheckBox />);

    render.find('input').simulate('change');
    expect(render).toMatchSnapshot();
  });

  it('should not be checked with change when disabled', () => {
    const render = mountWithTheme(<CheckBox disabled />);

    render.find('input').simulate('change');
    expect(render).toMatchSnapshot();
  });

  it('should call onChange callback', () => {
    const spy = jest.fn();
    const render = mountWithTheme(<CheckBox onChange={spy} />);

    expect(spy).toHaveBeenCalledTimes(0);

    render.find('input').simulate('change');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
