import React from 'react';
import 'jest-styled-components';

import { AlertProvider, AlertConsumer, Message, Button } from '../..';

global.scrollTo = jest.fn(); // window scrollTo

jest.useFakeTimers();

describe('<Alert />', () => {
  it('should render withouth a problem', () => {
    const alertProps = {
      description: 'Message deleted',
      ariaLabel: 'Message deleted, click to undo',
      onCloseText: 'Undo',
    };
    const render = mountWithTheme(
      <AlertProvider component={Message}>
        <AlertConsumer>
          {({ show, hide }) => (
            <Button primary onClick={() => show({ ...alertProps, onClose: hide })}>
              Show alert
            </Button>
          )}
        </AlertConsumer>
      </AlertProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should show an alert message', () => {
    const alertProps = {
      description: 'Message deleted',
      ariaLabel: 'Message deleted, click to undo',
      onCloseText: 'Undo',
    };
    const render = mountWithTheme(
      <AlertProvider component={Message}>
        <AlertConsumer>
          {({ show, hide }) => (
            <Button primary onClick={() => show({ ...alertProps, onClose: hide })}>
              Show alert
            </Button>
          )}
        </AlertConsumer>
      </AlertProvider>,
    );

    render.find('button').simulate('click');

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

    expect(render).toMatchSnapshot();
  });

  it('should show another type of alert message', () => {
    const alertProps = {
      description: 'Message deleted',
      ariaLabel: 'Message deleted, click to undo',
      onCloseText: 'Undo',
      type: 'success',
    };
    const render = mountWithTheme(
      <AlertProvider component={Message}>
        <AlertConsumer>
          {({ show, hide }) => (
            <Button primary onClick={() => show({ ...alertProps, onClose: hide })}>
              Show alert
            </Button>
          )}
        </AlertConsumer>
      </AlertProvider>,
    );

    render.find('button').simulate('click');

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

    expect(render).toMatchSnapshot();
  });
});
