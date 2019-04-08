import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';

/**
 * Tooltip
 *
 * This component is in charge of displaying a tooltip.
 * We use Tippy.js, a highly customizable tooltip and popover library
 * powered by Popper.js
 * https://atomiks.github.io/tippyjs/
 *
 * To see all props you can use: https://atomiks.github.io/tippyjs/all-options/
 *
 * @param {string} appearance // Appearance is used to set the color of the tooltip which can be dark or light.
 * @param {boolean} arrow // Determines if an arrow should be added to the tooltip pointing toward the reference element.
 * @param {string} boundary // The boundary preventOverflow modifier. Possible values:  "scrollParent",  "window", "viewport", or an HTMLElement.
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment). It is the element where a tooltip is hooked to.
 * @param {string} className // Class needed by styled components.
 * @param {node, string, function} content // The content of the tooltip. Along with a string or element, you can use a function that takes the reference element as an argument and returns content.
 * @param {string, number} maxWidth // Determines the maximum width of the tooltip.
 * @param {string} placement // Positions the tooltip relative to its reference element.
 * @param {string} trigger // The events (each separated by a space) which cause a tooltip to show. Possible values:  "mouseenter", "focus",  "click", "manual". Use  "manual" to only trigger the tippy programmatically.
 *
 * @return {jsx}
 */

const Tooltip = ({
  appearance,
  arrow,
  boundary,
  children,
  className,
  content,
  maxWidth,
  placement,
  trigger,
  ...rest
}) => {
  return (
    <Tippy
      arrow={arrow}
      className={`${className} ${appearance}`}
      content={content}
      maxWidth={maxWidth}
      placement={placement}
      trigger={trigger}
      boundary={boundary}
      {...rest}
    >
      {/*
        To use a component element as a child we need to wrap element with a div
        https://github.com/atomiks/tippy.js-react#component-children
      */}
      {children}
    </Tippy>
  );
};

const { node, string } = PropTypes;
Tooltip.propTypes = {
  ...Tippy.propTypes,
  children: node,
  className: string,
};

Tooltip.defaultProps = {
  ...Tippy.defaultProps,
  arrow: true,
  boundary: 'window',
  children: null,
  placement: 'top',
  trigger: 'click',
};

export default styled(Tooltip)`
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  padding: 0.6rem 1rem;
  font-size: 1.4rem;

  /* Styling the arrow to match specifications */
  &[x-placement^='top'] {
    .tippy-arrow {
      border-width: 6px 6px 0 6px;
      bottom: -6px;
    }
  }
  &[x-placement^='bottom'] {
    .tippy-arrow {
      border-width: 0 6px 6px 6px;
      top: -6px;
    }
  }

  &[x-placement^='left'] {
    .tippy-arrow {
      border-width: 6px 0px 6px 6px;
      right: -6px;
    }
  }

  &[x-placement^='right'] {
    .tippy-arrow {
      border-width: 6px 6px 6px 0px;
      left: -6px;
    }
  }

  /* Styling the dark theme arrow */
  &.dark {
    color: ${({ theme: { palette } }) => palette.white};
    background: ${({ theme: { palette } }) => palette.darkBlue};

    &[x-placement^='top'],
    &[x-placement^='bottom'] {
      .tippy-arrow {
        border-color: ${({ theme: { palette } }) => palette.darkBlue} transparent
          ${({ theme: { palette } }) => palette.darkBlue} transparent;
      }
    }
    &[x-placement^='left'],
    &[x-placement^='right'] {
      .tippy-arrow {
        border-color: transparent ${({ theme: { palette } }) => palette.darkBlue} transparent
          ${({ theme: { palette } }) => palette.darkBlue};
      }
    }
  }

  /* Styling the light theme arrow */
  &.light {
    color: ${({ theme: { palette } }) => palette.darkBlue};
    background: ${({ theme: { palette } }) => palette.white};
    box-shadow: 0 0 0 1px ${({ theme: { palette } }) => palette.lightGrey},
      0 2px 16px 0 rgba(0, 0, 0, 0.1);

    &[x-placement^='top'],
    &[x-placement^='bottom'] {
      .tippy-arrow {
        border-color: ${({ theme: { palette } }) => palette.white} transparent
          ${({ theme: { palette } }) => palette.white} transparent;
      }
    }

    &[x-placement^='left'],
    &[x-placement^='right'] {
      .tippy-arrow {
        border-color: transparent ${({ theme: { palette } }) => palette.white} transparent
          ${({ theme: { palette } }) => palette.white};
      }
    }
  }
`;
