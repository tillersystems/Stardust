import React, { Children, cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import { Portal } from 'react-portal';
import { Manager, Popper, Reference } from 'react-popper';

import EventListener from '../EventListener';
import { Arrow, PopoverContentWrapper, PopoverTriggerWrapper } from './elements';

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
      event.target instanceof HTMLElement &&
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
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const {
      animationProps,
      content,
      contentWrapperStyle,
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
        <Portal>
          <Popper modifiers={modifiers} placement={placement} positionFixed={positionFixed}>
            {({ arrowProps, outOfBoundaries, placement, ref: popperRef, style }) => {
              return (
                <PoseGroup flipMove={false}>
                  {isOpen && (
                    <PopoverContentWrapperAnimation
                      key="popover"
                      data-testid="popover"
                      data-out-of-boundaries={outOfBoundaries || undefined}
                      data-placement={placement}
                      animationProps={animationProps}
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
                    </PopoverContentWrapperAnimation>
                  )}
                </PoseGroup>
              );
            }}
          </Popper>
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
        </Portal>
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
   * Custom animation options to pass to PopoverContentWrapperAnimation
   */
  animationProps: object,

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
  animationProps: null,
  contentWrapperStyle: null,
  hasArrow: false,
  isOpen: false,
  modifiers: {},
  onClickOutside: null,
  placement: 'bottom',
  positionFixed: false,
  triggerRef: null,
  triggerWrapperCss: null,
  width: 'auto',
};

/**
 * Animation
 */
const PopoverContentWrapperAnimation = posed(PopoverContentWrapper)({
  enter: {
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 900, damping: 30 },
      default: { duration: 150 },
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 150 },
  },
});

export default Popover;
