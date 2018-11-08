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

  it('should have default onOverlayClick', () => {
    expect(Modal.defaultProps.onOverlayClick()).toMatchSnapshot();
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

  it('should render open modal with a title', () => {
    const render = mountWithTheme(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>
          <Modal.Title>My title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render open modal with centered body', () => {
    const render = mountWithTheme(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>
          <Modal.Title>My title</Modal.Title>
        </Modal.Header>
        <Modal.Body center>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render open modal a footer aligned to left', () => {
    const render = mountWithTheme(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>
          <Modal.Title>My title</Modal.Title>
        </Modal.Header>
        <Modal.Body center>Body</Modal.Body>
        <Modal.Footer alignment="left">Footer</Modal.Footer>
      </Modal>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render open modal a footer aligned to right', () => {
    const render = mountWithTheme(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>
          <Modal.Title>My title</Modal.Title>
        </Modal.Header>
        <Modal.Body center>Body</Modal.Body>
        <Modal.Footer alignment="right">Footer</Modal.Footer>
      </Modal>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render open modal a centered footer', () => {
    const render = mountWithTheme(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>
          <Modal.Title>My title</Modal.Title>
        </Modal.Header>
        <Modal.Body center>Body</Modal.Body>
        <Modal.Footer alignment="center">Footer</Modal.Footer>
      </Modal>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render open modal a spaced footer', () => {
    const render = mountWithTheme(
      <Modal active width="50rem" height="35rem">
        <Modal.Header>
          <Modal.Title>My title</Modal.Title>
        </Modal.Header>
        <Modal.Body center>Body</Modal.Body>
        <Modal.Footer alignment="spaced">Footer</Modal.Footer>
      </Modal>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should call overlayClick callback', () => {
    const spy = jest.fn();
    const render = mountWithTheme(
      <Modal active width="50rem" height="35rem" onOverlayClick={spy}>
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );

    render
      .find('[data-test="overlay"]')
      .first()
      .simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
