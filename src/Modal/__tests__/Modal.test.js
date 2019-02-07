import React from 'react';
import { fireEvent } from 'react-testing-library';

import Modal from '..';

describe('<Modal />', () => {
  test('should render open modal without a problem', () => {
    const Header = 'My title';
    const Body = 'body';
    const Footer = 'footer';
    const { getByText } = render(
      <Modal active width="50rem" height="35rem" padding="4rem">
        <Modal.Header>{Header}</Modal.Header>
        <Modal.Body>{Body}</Modal.Body>
        <Modal.Footer>{Footer}</Modal.Footer>
      </Modal>,
    );
    const HeaderNode = getByText(Header);
    const BodyNode = getByText(Body);
    const FooterNode = getByText(Footer);

    expect(HeaderNode).toBeInTheDocument();
    expect(BodyNode).toBeInTheDocument();
    expect(FooterNode).toBeInTheDocument();
  });

  test('should render open modal with a title', () => {
    const title = 'My title';
    const { getByText } = render(
      <Modal active width="50rem" height="35rem" padding="4rem">
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
