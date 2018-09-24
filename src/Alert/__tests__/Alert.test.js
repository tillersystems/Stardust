import React from 'react';
import 'jest-styled-components';

import Alert from '..';

describe('<Alert />', () => {
  it('should render without a problem', () => {
    const render = shallowWithTheme(<Alert message="this is a message" />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a success alert', () => {
    const render = shallowWithTheme(<Alert message="this is a message" success />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a info alert', () => {
    const render = shallowWithTheme(<Alert message="this is a message" info />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a warning alert', () => {
    const render = shallowWithTheme(<Alert message="this is a message" warning />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a error alert', () => {
    const render = shallowWithTheme(<Alert message="this is a message" error />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should call onClode handler', () => {
    const handleOnClose = jest.fn();
    const render = mountWithTheme(<Alert message="this is a message" onClose={handleOnClose} />);

    render
      .find('Icon')
      .last()
      .simulate('click');

    expect(handleOnClose).toHaveBeenCalled();
  });
});
