import React from 'react';
import 'jest-styled-components';

import Modal from '..';

describe('<Modal />', () => {
  it('should render close modal withouth a problem', () => {
    const render = mountWithTheme(
      <Modal width="50rem" height="35rem">
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );

    expect(render).toMatchSnapshot();
  });
  it('should render open modal withouth a problem', () => {
    const render = mountWithTheme(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );

    expect(render).toMatchSnapshot();
  });
  it('should render open modal with overlay clickable withouth a problem', () => {
    const render = mountWithTheme(
      <Modal width="50rem" height="35rem" overlayClick={() => {}}>
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );

    expect(render).toMatchSnapshot();
  });
});
