import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { Portal } from 'react-portal';

import Theme from '../Theme';
import { containerVariants, overlayVariants, dialogVariants } from './animation';

/**
 * A Modal is displayed through a Portal added at the end of the body element. An overlay hides
 * everything expect the modal itself. Action when clicking on the overlay can be used to
 * control modal display.
 * Modal can be used to display additional informations to the user, or ask for user input.
 *
 * @return {jsx}
 */

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import { Container, Overlay, Dialog, Title } from './elements';

const { node, string, bool, func } = PropTypes;

class Modal extends PureComponent {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;
  static Title = Title;

  /**
   * Render function
   */
  render() {
    const { active, width, height, padding, onOverlayClick, children } = this.props;
    return (
      <Portal>
        <AnimatePresence>
          {active && (
            <Container
              key="Container"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              <Overlay
                onClick={onOverlayClick}
                variants={overlayVariants}
                key="Overlay"
                data-testid="overlay"
              />
              <Dialog
                width={width}
                height={height}
                padding={padding}
                key="Dialog"
                variants={dialogVariants}
              >
                {children}
              </Dialog>
            </Container>
          )}
        </AnimatePresence>
      </Portal>
    );
  }
}

/**
 * PropTypes validation
 */
Modal.propTypes = {
  /**
   * Displays or hides the modal
   */
  active: bool,

  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node,

  /**
   * Modal height
   */
  height: string,

  /**
   * Callback triggered when overlay is clicked by the user
   */
  onOverlayClick: func,

  /**
   * Modal padding
   */
  padding: string,

  /**
   * Modal width
   */
  width: string,
};

/**
 * Default propTypes
 */
Modal.defaultProps = {
  active: false,
  children: null,
  height: '39rem',
  onOverlayClick: () => {},
  padding: Theme.dimensions.medium,
  width: '48rem',
};

export default Modal;
