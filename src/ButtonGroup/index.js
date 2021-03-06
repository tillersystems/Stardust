import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transparentize } from 'polished';

import Button from '../Button';

/**
 * A ButtonGroup wraps as much Buttons as it is given as children.
 * Only one Button is active at a time. Each Button is cloned as is, meaning
 * you could provide Buttons with different styles.
 *
 * @return {jsx}
 */
class ButtonGroup extends PureComponent {
  /** Internal state. */
  state = {
    activeButton: this.props.defaultActiveButtonName, // eslint-disable-line react/destructuring-assignment
  };

  /**
   * updateActiveButton.
   *
   * Handles click on a child button.
   * In addition, notifies the parent about a click on a button child.
   *
   * @param {string} name
   * @param {function} onClick
   */
  updateActiveButton = (name, onClick) => {
    const { onChange } = this.props;
    this.setState({ activeButton: name }, () => {
      onChange && onChange(name);
      onClick && onClick();
    });
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { children, className } = this.props;
    const { activeButton } = this.state;

    return (
      <div role="group" className={className} tabIndex="-1">
        {Children.map(children, child => {
          if (child.props.disabled) {
            return child;
          }
          if (child.type.displayName !== 'Button') {
            return child;
          }
          if (!child.props.name) {
            throw new Error('"name" prop must be provided to Button');
          }

          return cloneElement(child, {
            onClick: () => this.updateActiveButton(child.props.name, child.props.onClick),
            'data-isactive': activeButton === child.props.name,
            'data-appearance': child.props.appearance,
          });
        })}
      </div>
    );
  }
}

const { func, node, string } = PropTypes;

/**
 * PropTypes Validation.
 */
ButtonGroup.propTypes = {
  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node,

  /**
   * ClassName needed by styled components
   */
  className: string,

  /**
   * Specifies which button is initially selected
   */
  defaultActiveButtonName: string,

  /**
   * Callback function called when a button is clicked
   */
  onChange: func,
};

/**
 * Default props.
 */
ButtonGroup.defaultProps = {
  children: null,
  className: '',
  defaultActiveButtonName: '',
  onChange: () => {},
};

export default styled(ButtonGroup)`
  display: flex;

  ${Button} {
    border-radius: 0;

    &:first-of-type {
      border-top-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
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
    &[data-isactive='true'][data-appearance='secondary'] {
      color: ${({ theme: { palette } }) => palette.primary.default};
      svg > path {
        fill: ${({ theme: { palette } }) => transparentize(0.3, palette.primary.default)};
      }
    }

    /* Button is not active */
    &[data-isactive='false'] {
      color: ${({ theme: { palette } }) => transparentize(0.3, palette.white)};
      svg > path {
        fill: ${({ theme: { palette } }) => transparentize(0.3, palette.white)};
      }
    }

    &[data-isactive='false'][data-appearance='secondary'],
    &[data-isactive='false'][data-appearance='default'] {
      color: ${({ theme: { palette } }) => transparentize(0.1, palette.spaceGrey)};
      svg > path {
        fill: ${({ theme: { palette } }) => transparentize(0.3, palette.spaceGrey)};
      }
    }
  }
`;
