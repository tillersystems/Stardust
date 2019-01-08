import React from 'react';
import { fireEvent, wait } from 'react-testing-library';

import { AlertProvider, AlertConsumer, Message, Button } from '../..';
import Theme from '../../Theme';

global.scrollTo = jest.fn(); // window scrollTo

jest.useFakeTimers();

describe('<Alert />', () => {
  beforeEach(() => {
    // Here we enable fake timers
    // This mocks out setTimeout and other timer functions with mock functions
    jest.useFakeTimers();
  });

  test('should render withouth a problem', () => {
    const alertProps = {
      description: 'Message deleted',
      ariaLabel: 'Message deleted, click to undo',
      onCloseText: 'Undo',
    };
    const { container } = render(
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
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should show an alert message', async () => {
    const alertProps = {
      description: 'Message deleted',
      ariaLabel: 'Message deleted, click to undo',
      onCloseText: 'Undo',
    };
    const buttonText = 'Show alert';
    const { getByText, queryByTestId } = render(
      <AlertProvider component={Message}>
        <AlertConsumer>
          {({ show, hide }) => (
            <Button primary onClick={() => show({ ...alertProps, onClose: hide })}>
              {buttonText}
            </Button>
          )}
        </AlertConsumer>
      </AlertProvider>,
    );
    const buttonNode = getByText(buttonText);

    // click on Show alert button
    fireEvent.click(buttonNode);

    // wait until the callback does not throw an error. In this case, that means
    // it'll wait until the modal appears in dom.
    await wait(() => {
      const alertContainerNode = queryByTestId('alert-container');

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

      expect(alertContainerNode).toBeInTheDocument();
    });
  });

  test('should show another type of alert message', async () => {
    const alertProps = {
      description: 'Message deleted',
      ariaLabel: 'Message deleted, click to undo',
      onCloseText: 'Undo',
      type: 'success',
    };
    const buttonText = 'Show alert';
    const { getByText, queryByTestId } = render(
      <AlertProvider component={Message}>
        <AlertConsumer>
          {({ show, hide }) => (
            <Button primary onClick={() => show({ ...alertProps, onClose: hide })}>
              {buttonText}
            </Button>
          )}
        </AlertConsumer>
      </AlertProvider>,
    );
    const buttonNode = getByText(buttonText);

    // click on Show alert button
    fireEvent.click(buttonNode);

    // wait until the callback does not throw an error. In this case, that means
    // it'll wait until the modal appears in dom.
    await wait(() => {
      const alertContainerNode = queryByTestId('alert-container');
      const messageNode = queryByTestId('message');

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

      expect(alertContainerNode).toBeInTheDocument();
      expect(messageNode).toBeInTheDocument();
      expect(messageNode).toHaveStyleRule('background', Theme.palette.success.default);
    });
  });

  test('should hide the alert message after 3000ms', async () => {
    const alertProps = {
      description: 'Message deleted',
      ariaLabel: 'Message deleted, click to undo',
      onCloseText: 'Undo',
    };
    const buttonText = 'Show alert';
    const { getByText, queryByTestId } = render(
      <AlertProvider component={Message} timeout={3000}>
        <AlertConsumer>
          {({ show, hide }) => (
            <Button primary onClick={() => show({ ...alertProps, onClose: hide })}>
              {buttonText}
            </Button>
          )}
        </AlertConsumer>
      </AlertProvider>,
    );
    const buttonNode = getByText(buttonText);

    // click on Show alert button
    fireEvent.click(buttonNode);

    // wait until the callback does not throw an error. In this case, that means
    // it'll wait until the modal appears in dom.
    await wait(() => {
      const alertContainerNode = queryByTestId('alert-container');

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

      expect(alertContainerNode).toBeInTheDocument();
    });

    const alertContainerNode = queryByTestId('alert-container');

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // wait until the callback does not throw an error. In this case, that means
    // it'll wait until the modal appears in dom.
    await wait(() => {
      expect(alertContainerNode).not.toBeInTheDocument();
    });
  });

  test('should show another type of alert message', async () => {
    const alertProps = {
      description: 'Message deleted',
      ariaLabel: 'Message deleted, click to undo',
      onCloseText: 'Undo',
      type: 'success',
    };
    const buttonText = 'Show alert';
    const { getByText, queryByTestId } = render(
      <AlertProvider component={Message}>
        <AlertConsumer>
          {({ show, hide }) => (
            <Button primary onClick={() => show({ ...alertProps, onClose: hide })}>
              {buttonText}
            </Button>
          )}
        </AlertConsumer>
      </AlertProvider>,
    );
    const buttonNode = getByText(buttonText);

    // click on Show alert button
    fireEvent.click(buttonNode);

    // wait until the callback does not throw an error. In this case, that means
    // it'll wait until the modal appears in dom.
    await wait(() => {
      const alertContainerNode = queryByTestId('alert-container');
      const messageNode = queryByTestId('message');

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

      expect(alertContainerNode).toBeInTheDocument();
      expect(messageNode).toBeInTheDocument();
      expect(messageNode).toHaveStyleRule('background', Theme.palette.success.default);
    });
  });

  test('should hide the alert message after 3000ms', async () => {
    const alertProps = {
      description: 'Message deleted',
      ariaLabel: 'Message deleted, click to undo',
      onCloseText: 'Undo',
    };
    const buttonText = 'Show alert';
    const { getByText, queryByTestId } = render(
      <AlertProvider component={Message} timeout={3000}>
        <AlertConsumer>
          {({ show, hide }) => (
            <Button primary onClick={() => show({ ...alertProps, onClose: hide })}>
              {buttonText}
            </Button>
          )}
        </AlertConsumer>
      </AlertProvider>,
    );
    const buttonNode = getByText(buttonText);

    // click on Show alert button
    fireEvent.click(buttonNode);

    // wait until the callback does not throw an error. In this case, that means
    // it'll wait until the modal appears in dom.
    await wait(() => {
      const alertContainerNode = queryByTestId('alert-container');

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

      expect(alertContainerNode).toBeInTheDocument();
    });

    const alertContainerNode = queryByTestId('alert-container');

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // wait until the callback does not throw an error. In this case, that means
    // it'll wait until the modal appears in dom.
    await wait(() => {
      expect(alertContainerNode).not.toBeInTheDocument();
    });
  });
});
