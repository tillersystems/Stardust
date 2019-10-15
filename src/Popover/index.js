import React, { Children, cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { Portal } from 'react-portal';
import { Manager, Popper, Reference } from 'react-popper';

import EventListener from '../EventListener';
import { Arrow, PopoverContentWrapper, PopoverTriggerWrapper } from './elements';
import { popoverVariants } from './animation';

/**
 * Popover using popperjs and portal
 *
 * See README, run storybook or see propTypes below for documentation
 */
class Popover extends PureComponent {
  popoverContent = null;
  popoverTrigger = null;

  /**
   * Saves the reference to the content of the popover. Allows us to keep the reference
   * somewhere when needed (check if click is inside the element)
   * Also call a callback if provided by the parent to move up the reference, allowing the parent
   * to have the reference too
   *
   * @param {HTMLElement} node - node of content element
   */
  setContentRef = node => {
    const { contentRef } = this.props;

    this.popoverContent = node;
    contentRef && contentRef(node);
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
   * Callback on document click to close the popover when click is outside the component
   * Triggers callback passed by the parent that must handles the prop value (controlled component)
   *
   * @param {Event} event - triggered by the user action
   *
   */
  handleDocumentClick = event => {
    if (
      event.target &&
      this.popoverContent &&
      !this.popoverContent.contains(event.target) &&
      this.popoverTrigger &&
      !this.popoverTrigger.contains(event.target)
    ) {
      const { onClickOutside } = this.props;
      onClickOutside && onClickOutside(event);
    }
  };

  /**
   * Render content of Popover which is a Popper component
   *
   */
  renderContent = () => {
    const {
      animationVariants,
      content,
      contentWrapperStyle,
      hasArrow,
      isOpen,
      modifiers,
      placement,
      positionFixed,
      usePortal,
      width,
    } = this.props;

    let popoverContent;
    const popper = (
      <Popper modifiers={modifiers} placement={placement} positionFixed={positionFixed}>
        {({ arrowProps, outOfBoundaries, placement, ref: popperRef, style }) => (
          <AnimatePresence>
            {isOpen && (
              <PopoverContentWrapper
                key="popover"
                data-testid="popover"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={animationVariants}
                data-out-of-boundaries={outOfBoundaries || undefined}
                data-placement={placement}
                ref={node => {
                  this.setContentRef(node);
                  popperRef(node);
                }}
                style={{ ...style, ...contentWrapperStyle }}
                width={width}
              >
                {content}
                {hasArrow && placement && (
                  <Arrow placement={placement} {...arrowProps}>
                    ▲
                  </Arrow>
                )}
              </PopoverContentWrapper>
            )}
          </AnimatePresence>
        )}
      </Popper>
    );

    if (usePortal) {
      popoverContent = <Portal>{popper}</Portal>;
    } else {
      popoverContent = popper;
    }

    return popoverContent;
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { isOpen, triggerWrapperCss } = this.props;

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
        {this.renderContent()}
        {isOpen && (
          <EventListener
            listeners={[
              {
                target: 'document',
                event: 'click',
                handler: this.handleDocumentClick,
                options: true,
              },
            ]}
          />
        )}
      </Manager>
    );
  }
}

/**
 * PropTypes Validation
 */
const { array, bool, func, node, object, oneOfType, string } = PropTypes;
Popover.propTypes = {
  /**
   * Custom variants animation from framer motion (https://www.framer.com/api/motion/) options to pass to our popover
   */
  animationVariants: object,

  /**
   * Must be a single element that will be the trigger of the popover
   */
  children: node.isRequired,

  /**
   * Displayed in a portal according to `isOpen` value
   */
  content: oneOfType([string, node]).isRequired,

  /**
   * Callback ref of content element
   */
  contentRef: func,

  /**
   * Custom style for content wrapper
   */
  contentWrapperStyle: object,

  /**
   * If popover content should display with an arrow or not
   */
  hasArrow: bool,

  /**
   * Boolean set to display or hide the popover
   */
  isOpen: bool,

  /**
   * Popper option. Plugins to alter the behaviour of the popper. See https://popper.js.org/popper-documentation.html
   */
  modifiers: object,

  /**
   * Pass this prop on click outside event (for example close the popover by updating `isOpen` prop value)
   */
  onClickOutside: func,

  /**
   * Popper option. Placement applied to popper. See https://popper.js.org/popper-documentation.html
   */
  placement: string,

  /**
   * Popper option. Put the popper in "fixed" mode. See https://popper.js.org/popper-documentation.html
   */
  positionFixed: bool,

  /**
   * Display the content on a portal
   */
  usePortal: bool,

  /**
   * Callback ref of trigger element
   */
  triggerRef: func,

  /**
   * css provided to the trigger wrapper. Must use `css` method from styled-components.
   */
  triggerWrapperCss: array,

  /**
   * Popover width
   */
  width: string,
};

/**
 * Default props
 */
Popover.defaultProps = {
  animationVariants: popoverVariants,
  contentWrapperStyle: null,
  contentRef: null,
  hasArrow: false,
  isOpen: false,
  modifiers: {},
  onClickOutside: null,
  placement: 'bottom',
  positionFixed: false,
  triggerRef: null,
  triggerWrapperCss: null,
  usePortal: false,
  width: 'auto',
};

export default Popover;
