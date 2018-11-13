import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { setLightness, transparentize } from 'polished';

import Button from '../Button';

const { bool, func, node, string } = PropTypes;

/**
 * Button Group
 *
 * This component is in charge of displaying
 * a button group
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // Add a text aside in the select next the selected value.
 * @param {boolean} primary // whether the button is a primary button or not.
 * @param {boolean} secondary // whether the button is a secondary button or not.
 * @param {boolean} success // whether the button is a success button or not.
 * @param {boolean} failure // whether the button is a failure button or not.
 * @param {boolean} fluid // whether the button is fluid or not.
 * @param {boolean} big // whether the button is big or not.
 * @param {boolean} small // whether the button is small or not.
 * @param {boolean} disabled // whether the button is disabled or not.
 * @param {function} onChange // Callback function called when a button is clicked.
 * @param {string} defaultActiveButton // Specifies the initial state: witch button is selected.
 *
 * @return {jsx}
 */
class ButtonGroup extends PureComponent {
  /**
   * PropTypes Validation.
   */
  static propTypes = {
    children: node,
    className: string,
    primary: bool,
    secondary: bool,
    success: bool,
    failure: bool,
    onChange: func,
    defaultActiveButton: string,
  };

  /**
   * Default props.
   */
  static defaultProps = {
    children: null,
    className: '',
    primary: false,
    secondary: false,
    success: false,
    failure: false,
    onChange: () => {},
    defaultActiveButton: '',
  };

  /** Internal state. */
  state = {
    activeButton: this.props.defaultActiveButton, // eslint-disable-line react/destructuring-assignment
  };

  /**
   * updateActiveButton.
   * Tell to the store witch button is activated
   * @param {string} name
   */
  updateActiveButton = name => {
    const { onChange } = this.props;

    this.setState({ activeButton: name });
    onChange && onChange(name);
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { children, className, ...rest } = this.props;
    const { activeButton } = this.state;

    return (
      <div role="group" className={className}>
        {Children.map(children, child =>
          cloneElement(child, {
            onClick: () => this.updateActiveButton(child.props.name),
            'data-isactive': activeButton === child.props.name,
            ...rest,
          }),
        )}
      </div>
    );
  }
}

export default styled(ButtonGroup)`
  display: flex;

  ${Button} {
    border-radius: 0;

    &:first-of-type {
      border-top-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};

      /* Primary ButtonGroup */
      ${({ primary }) =>
        primary &&
        css`
          border-right: 1px solid
            ${({ theme: { palette } }) => setLightness(0.4, palette.primary.default)};
        `}

      /* Secondary ButtonGroup */
        ${({ secondary }) =>
          secondary &&
          css`
            border-right: 1px solid
              ${({ theme: { palette } }) => setLightness(0.9, palette.secondary.default)};
          `}

      /* Success ButtonGroup */
      ${({ success }) =>
        success &&
        css`
          border-right: 1px solid
            ${({ theme: { palette } }) => setLightness(0.4, palette.success.default)};
        `}

      /* Failure ButtonGroup */
      ${({ failure }) =>
        failure &&
        css`
          border-right: 1px solid
            ${({ theme: { palette } }) => setLightness(0.5, palette.failure.default)};
        `}
    }

    &:nth-child(n):not(:first-of-type) {
      border-left: 0;
    }

    &:last-of-type {
      border-top-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-left: 0;
    }

    /* Button is active */
    /* Using text-shadow instead of font-weight: bold to avoid jumping */
    &[data-isactive='true'] {
      text-shadow: 0.6px 0 0 currentColor;
    }

    /* Button is not active */
    &[data-isactive='false'] {
      color: ${({ theme: { palette } }) => transparentize(0.3, palette.white)};
    }

    /* Secondary ButtonGroup */
    ${({ secondary }) =>
      secondary &&
      css`
        /* Button is not active */
        &[data-isactive='false'] {
          color: ${({ theme: { palette } }) => transparentize(0.3, palette.spaceGrey)};
        }
        /* Button is not active */
        &[data-isactive='true'] {
          color: ${({ theme: { palette } }) => palette.primary.default};
        }
      `}
  }
`;
