import React from 'react';
import { fireEvent } from 'react-testing-library';

import Modal from '..';

describe('<Modal />', () => {
  test('should render close modal withouth a problem', () => {
    const { container } = render(
      <Modal width="50rem" height="35rem">
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have default onOverlayClick', () => {
    expect(Modal.defaultProps.onOverlayClick()).toMatchSnapshot();
  });

  test('should render open modal withouth a problem', () => {
    const { container } = render(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render open modal with a title', () => {
    const title = 'My title';
    const { getByText } = render(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );
    const titleNode = getByText(title);
    expect(titleNode).toBeInTheDocument();
  });

  test('should render open modal with centered body', () => {
    const body = 'Body';
    const { getByText } = render(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>
          <Modal.Title>My title</Modal.Title>
        </Modal.Header>
        <Modal.Body center>{body}</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );
    const bodyNode = getByText(body);

    expect(bodyNode).toHaveStyleRule('margin', 'auto');
  });

  test('should call overlayClick callback', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Modal active width="50rem" height="35rem" onOverlayClick={spy}>
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );
    const overlay = getByTestId('overlay');

    // Click on the overlay
    fireEvent.click(overlay);

    expect(spy).toHaveBeenCalled();
  });
});
