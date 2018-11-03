import React from 'react';
import 'jest-styled-components';

import Alert from '..';

describe('<Alert />', () => {
  it('should render without a problem', () => {
    const render = shallowWithTheme(<Alert message="this is a message" />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should be closable', () => {
    const render = shallowWithTheme(<Alert message="this is a message" closable />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a success alert', () => {
    const render = shallowWithTheme(<Alert message="this is a message" type="success" />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a info alert', () => {
    const render = shallowWithTheme(<Alert message="this is a message" type="info" />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a warning alert', () => {
    const render = shallowWithTheme(<Alert message="this is a message" type="warning" />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render a error alert', () => {
    const render = shallowWithTheme(<Alert message="this is a message" type="error" />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should call onClose handler', () => {
    const handleOnClose = jest.fn();
    const render = mountWithTheme(
      <Alert message="this is a message" closable onClose={handleOnClose} />,
    );

    render
      .find('Icon')
      .last()
      .simulate('click');

    expect(handleOnClose).toHaveBeenCalled();
  });
});
