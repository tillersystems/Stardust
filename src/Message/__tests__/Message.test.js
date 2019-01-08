import React from 'react';
import { fireEvent } from 'react-testing-library';

import Message from '..';

describe('<Message />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Message description="this is a message" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render a success alert', () => {
    const { container } = render(<Message description="this is a message" type="success" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render a info alert', () => {
    const { container } = render(<Message description="this is a message" type="info" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render a warning alert', () => {
    const { container } = render(<Message description="this is a message" type="warning" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render a error alert', () => {
    const { container } = render(<Message description="this is a message" type="error" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should call onClose handler', () => {
    const handleOnClose = jest.fn();
    const closeText = 'close';
    const { getByText } = render(
      <Message
        description="this is a message"
        type="error"
        onClose={handleOnClose}
        onCloseText={closeText}
      />,
    );
    const dismissMessageNode = getByText(closeText);

    fireEvent.click(dismissMessageNode);

    expect(handleOnClose).toHaveBeenCalled();
  });
});
