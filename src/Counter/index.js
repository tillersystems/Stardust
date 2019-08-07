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
    count: this.props.value, // eslint-disable-line react/destructuring-assignment,
  };

  /**
   * Component Did Update
   * Method invoked immediately after updating occur.
   */
  componentDidUpdate(prevProps) {
    const { value } = this.props;

    // Update state only if props are changed
    if (prevProps.value !== value) {
      this.setState({
        count: value,
      });
    }
  }

  /**
   * Handle Increment click.
   */
  handleIncrementClick = () => {
    const { count } = this.state;
    const { step, max, onIncrement } = this.props;

    this.setState(
      prevState => ({
        count: count === max ? prevState.count : prevState.count + step,
      }),
      () => (count === max ? null : onIncrement()),
    );
  };

  /**
   * Handle Decrement click.
   */
  handleDecrementClick = () => {
    const { count } = this.state;
    const { step, min, onDecrement } = this.props;

    this.setState(
      prevState => ({
        count: count === min ? prevState.count : prevState.count - step,
      }),
      () => (count === min ? null : onDecrement()),
    );
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { className, step, max, min, width, appearance } = this.props;
    const { count } = this.state;

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
          {count}
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
   * Value of counter. The value is set to 0 if no value is provided by prop
   */
  value: number,

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
  max: 1000,
  min: 0,
  onIncrement: () => {},
  onDecrement: () => {},
  step: 1,
  value: 0,
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
