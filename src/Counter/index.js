/* eslint-disable react/require-default-props */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from '..';
import { FakeInput } from './elements';

const { func, number, string } = PropTypes;

/**
 * A Counter is a number value that can be updated by two Buttons surrounding the displayed value.
 *
 * @return {jsx}
 */
class Counter extends PureComponent {
  state = {
    value: this.props.defaultValue, // eslint-disable-line react/destructuring-assignment,
  };

  /**
   * Returns true if requested prop exists
   *
   * @param {string} prop - requested property name
   *
   * @return {boolean}
   */
  isControlled = prop => {
    const props = this.props;

    return props.hasOwnProperty(prop);
  };

  /**
   * Returns the value a property from props if prop exists and from state otherwise
   *
   * @param {string} key - requested property name
   *
   * @return {*} value of the property
   */
  getControllableValue = key => {
    const props = this.props;
    const state = this.state;

    return this.isControlled(key) ? props[key] : state[key];
  };

  /**
   * Handle Increment click.
   */
  handleIncrementClick = () => {
    const value = this.getControllableValue('value');
    const { step, max, onIncrement } = this.props;

    const nextValue = value + step;

    if (this.isControlled('value')) {
      nextValue > max ? null : onIncrement(nextValue);
    } else {
      this.setState(
        {
          value: nextValue > max ? value : nextValue,
        },
        () => (nextValue > max ? null : onIncrement(nextValue)),
      );
    }
  };

  /**
   * Handle Decrement click.
   */
  handleDecrementClick = () => {
    const value = this.getControllableValue('value');
    const { step, min, onDecrement } = this.props;

    const nextValue = value - step;

    if (this.isControlled('value')) {
      nextValue < min ? null : onDecrement(nextValue);
    } else {
      this.setState(
        {
          value: nextValue < min ? value : nextValue,
        },
        () => (nextValue < min ? null : onDecrement(nextValue)),
      );
    }
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { className, step, max, min, width, appearance } = this.props;
    const value = this.getControllableValue('value');

    return (
      <div
        role="group"
        className={className}
        tabIndex="-1"
        step={step}
        max={max}
        min={min}
        width={width}
      >
        <Button appearance={appearance} onClick={this.handleDecrementClick} data-testid="decrement">
          -
        </Button>
        <FakeInput width={width} data-testid="fakeinput">
          {value}
        </FakeInput>
        <Button appearance={appearance} onClick={this.handleIncrementClick} data-testid="increment">
          +
        </Button>
      </div>
    );
  }
}

/**
 * PropTypes Validation.
 */
Counter.propTypes = {
  /**
   * Buttons appearance prop customizing the style
   */
  appearance: string,

  /**
   * ClassName needed by styled components
   */
  className: string,

  /**
   * ClassName needed by styled components
   */
  // eslint-disable-next-line react/no-unused-prop-types
  value: number,

  /**
   * Default value of counter. The value is set to 0 if no value is provided by prop
   */
  defaultValue: number,

  /**
   * Maximum value allowed
   */
  max: number,

  /**
   * Minimum value allowed
   */
  min: number,

  /**
   * Callback function called on increment
   */
  onIncrement: func,

  /**
   * Callback function called on decrement
   */
  onDecrement: func,

  /**
   * Step for incrementing/decrementing value
   */
  step: number,

  /**
   * The width of the input
   */
  width: string,
};

/**
 * Default props.
 */
Counter.defaultProps = {
  appearance: 'secondary',
  className: '',
  defaultValue: 0,
  max: 1000,
  min: 0,
  onIncrement: () => {},
  onDecrement: () => {},
  step: 1,
  width: '5rem',
};

export default styled(Counter)`
  display: flex;
  ${Button} {
    border-radius: 0;
    font-size: ${({ theme: { fonts } }) => fonts.size.h5};

    &:first-of-type {
      border-top-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
    }

    &:last-of-type {
      border-top-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
    }
  }
`;
