import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import Modal from '..';
import Theme from '../../Theme';

describe('<Modal />', () => {
  it('should render close modal withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Modal width="50rem" height="35rem">
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>Body</Modal.Body>
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
  it('should render open modal withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Modal active width="50rem" height="35rem">
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>Body</Modal.Body>
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
  it('should render open modal with overlay clickable withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Modal width="50rem" height="35rem" overlayClick={() => {}}>
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>Body</Modal.Body>
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
});
