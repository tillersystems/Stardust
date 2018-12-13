import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from '..';
import { FakeInput } from './elements';

const { func, number, string } = PropTypes;

/**
 * Counter.
 *
 * This component is in charge of displaying
 * an Counter component.
 *
 * @param {string} appearance // Button appareance.
 * @param {string} className // className needed by styled component.
 * @param {number} max // Maximum value allowed.
 * @param {number} min // Minimum value allowed.
 * @param {func} onIncrement // Callback function called on increment.
 * @param {func} onDecrement // Callback function called on decrement.
 * @param {number} step // Step for increment / decrement value.
 * @param {number} value // incremented/decremented value. The value is set to 0 if no value provided.
 * @param {string} width // The width of the input.
 *
 * @return {jsx}
 */
class Counter extends PureComponent {
  /**
   * PropTypes Validation.
   */
  static propTypes = {
    appearance: string,
    className: string,
    max: number,
    min: number,
    onIncrement: func,
    onDecrement: func,
    step: number,
    value: number,
    width: string,
  };

  /**
   * Default props.
   */
  static defaultProps = {
    className: '',
    value: 0,
    step: 1,
    max: 1000,
    min: 0,
    width: '5rem',
    appearance: 'secondary',
    onIncrement: () => {},
    onDecrement: () => {},
  };

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
        <Button appearance={appearance} onClick={this.handleDecrementClick}>
          -
        </Button>
        <FakeInput width={width} data-test="fakeinput">
          {count}
        </FakeInput>
        <Button appearance={appearance} onClick={this.handleIncrementClick}>
          +
        </Button>
      </div>
    );
  }
}

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
