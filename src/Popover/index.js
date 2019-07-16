import React, { Children, cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import { Portal } from 'react-portal';
import { Manager, Popper, Reference } from 'react-popper';

import { PopoverContentWrapper, PopoverTriggerWrapper } from './elements';

/**
 * Popover using popperjs and portal
 *
 * A popover displays a content in a Portal according to a boolean prop `isOpen`. Value of this prop
 * is left to be handled by the parent (uncontrolled state). Component may be updated in the near future
 * to handle controlled state too.
 *
 * @param {bool} hasArrow - if popover content should display with an arrow or not
 * @param {HTMLElement|node|string} children - must be a single element that will be the trigger of the popover
 * @param {node|string} content - displayed in a portal according to `isOpen` value
 * @param {boolean} isOpen - boolean set to display or hide the popover
 * @param {Object} modifiers - Popper option. Plugins to alter the behaviour of the popper. See https://popper.js.org/popper-documentation.html
 * @param {string} placement - Popper option. Placement applied to popper. See https://popper.js.org/popper-documentation.html
 * @param {boolean} positionFixed - Popper option. Put the popper in "fixed" mode. See https://popper.js.org/popper-documentation.html
 * @param {Array} triggerWrapperCss // css provided to the trigger wrapper. Must use `css` method from styled-components.
 * @param {string} width - Popover width
 *
 * @return {jsx}
 */
class Popover extends PureComponent {
  popoverContent = null;
  popoverTrigger = null;

  /**
   * Saves the reference to the content of the popover. Allows us to keep the reference
   * somewhere when needed (check if click is inside the element)
   *
   * @param {HTMLElement} node - node of content element
   */
  setContentRef = node => {
    this.popoverContent = node;
  };

  /**
   * Saves the reference to the trigger of the popover. Allows us to keep the reference
   * somewhere when needed (check if click is inside the element)
   * Also call a callback if provided by the parent to move up the reference, allowing the parent
   * to have the reference too
   *
   * @param {HTMLElement} node - node of content element
   */
  setTriggerRef = node => {
    const { triggerRef } = this.props;

    this.popoverTrigger = node;
    triggerRef && triggerRef(node);
  };

  /**
   * Renders trigger element according to its type
   *
   */
  renderTrigger = () => {
    const { children } = this.props;

    if (children instanceof HTMLElement || typeof children === 'string') {
      return children;
    }

    return cloneElement(Children.only(children), children.props);
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const {
      children,
      content,
      hasArrow,
      isOpen,
      modifiers,
      placement,
      positionFixed,
      triggerWrapperCss,
      width,
    } = this.props;

    return (
      <Manager>
        <Reference>
          {({ ref: popperRef }) => {
            return (
              <PopoverTriggerWrapper
                css={triggerWrapperCss}
                ref={node => {
                  if (node !== null) {
                    this.setTriggerRef(node);
                    popperRef(node);
                  }
                }}
              >
                {this.renderTrigger()}
              </PopoverTriggerWrapper>
            );
          }}
        </Reference>
        {isOpen && (
          <Portal>
            <Popper modifiers={modifiers} placement={placement} positionFixed={positionFixed}>
              {({ arrowProps, outOfBoundaries, placement, ref: popperRef, style }) => {
                return (
                  <PoseGroup flipMove={false}>
                    <PopoverContentWrapperAnimation
                      key="popover"
                      data-testid="popover"
                      data-out-of-boundaries={outOfBoundaries || undefined}
                      data-placement={placement}
                      ref={node => {
                        this.setContentRef(node);
                        popperRef(node);
                      }}
                      style={style}
                      width={width}
                    >
                      {content}
                      {/* {hasArrow && <PopoverArrow {...popoverArrowProps} />} */}
                    </PopoverContentWrapperAnimation>
                  </PoseGroup>
                );
              }}
            </Popper>
          </Portal>
        )}
      </Manager>
    );
  }
}

/**
 * PropTypes Validation
 */
const { array, bool, node, object, oneOfType, string } = PropTypes;
Popover.propTypes = {
  hasArrow: bool,
  children: node.isRequired,
  content: oneOfType([string, node]).isRequired,
  isOpen: bool,
  modifiers: object,
  placement: string,
  positionFixed: bool,
  triggerWrapperCss: array,
  width: string,
};

/**
 * Default props
 */
Popover.defaultProps = {
  hasArrow: false,
  isOpen: false,
  modifiers: {},
  placement: 'bottom',
  positionFixed: false,
  triggerWrapperCss: null,
  width: 'auto',
};

/**
 * Animation
 */
const PopoverContentWrapperAnimation = posed(PopoverContentWrapper)({
  enter: {
    y: 15,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 900, damping: 30 },
      default: { duration: 150 },
    },
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: { duration: 150 },
  },
});

export default Popover;
