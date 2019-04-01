import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import { Portal } from 'react-portal';
import Theme from '../Theme';

/**
 * Modal
 *
 * This component is in charge of displaying
 * a modal
 *
 * @param {string} active // Boolean set to display or hide the modal.
 * @param {string} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // className needed by styled components.
 * @param {string} height // Modal height.
 * @param {string} width // Modal width.
 * @param {string} padding // Modal padding.
 * @param {string} onOverlayClick // A model can have a clickable overlay to close it.
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
   * PropTypes validation
   */
  static propTypes = {
    children: node,
    active: bool,
    height: string,
    width: string,
    padding: string,
    onOverlayClick: func,
  };

  /**
   * Default propTypes
   */
  static defaultProps = {
    children: null,
    active: false,
    width: '48rem',
    height: '39rem',
    padding: Theme.dimensions.medium,
    onOverlayClick: () => {},
  };

  /**
   * Render function
   */
  render() {
    const { active, width, height, padding, onOverlayClick, children } = this.props;
    return (
      <Portal>
        <PoseGroup>
          {active && (
            <ContainerAnimation key="Container">
              <OverlayAnimation onClick={onOverlayClick} key="Overlay" data-testid="overlay" />
              <DialogAnimation width={width} height={height} padding={padding} key="Dialog">
                {children}
              </DialogAnimation>
            </ContainerAnimation>
          )}
        </PoseGroup>
      </Portal>
    );
  }
}

/**
 * Animation
 */
const ContainerAnimation = posed(Container)({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});
const OverlayAnimation = posed(Overlay)({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});
const DialogAnimation = posed(Dialog)({
  enter: {
    y: 0,
    opacity: 1,
    delay: 150,
    transition: {
      y: { type: 'spring', stiffness: 900, damping: 28 },
      default: { duration: 150 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
});

export default Modal;
