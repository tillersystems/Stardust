import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';

/**
 * A Tooltip extends the content of another element by providing additional content.
 * Its position and appearance can be customized.
 *
 * We use Tippy.js, a highly customizable tooltip and popover library
 * powered by Popper.js
 * https://atomiks.github.io/tippyjs/
 *
 * To see all props you can use: https://atomiks.github.io/tippyjs/all-options/
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
      <div style={{ display: 'inline-flex' }}>{children}</div>
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
