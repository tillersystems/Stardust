import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, NumberInput } from '..';
import { Container, InputElement } from '../Input/TextInput/elements';

const { string, number } = PropTypes;

/**
 * Counter.
 *
 * This component is in charge of displaying
 * an Counter component.
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // Add a text aside in the select next the selected value.
 *
 * @return {jsx}
 */
class Counter extends PureComponent {
  /**
   * PropTypes Validation.
   */
  static propTypes = {
    className: string,
    defaultCountValue: number,
    step: number,
    max: number,
    min: number,
    width: string,
    appearance: string,
  };

  /**
   * Default props.
   */
  static defaultProps = {
    className: '',
    defaultCountValue: 0,
    step: 1,
    max: 1000,
    min: 0,
    width: '5rem',
    appearance: 'secondary',
  };

  state = {
    counter: this.props.defaultCountValue, // eslint-disable-line react/destructuring-assignment,
  };

  /**
   * Increment counter.
   */
  increment = () => {
    const { counter } = this.state;
    const { step, max } = this.props;
    this.setState({
      counter: counter === max ? counter : counter + step,
    });
  };

  /**
   * Decrement counter.
   */
  decrement = () => {
    const { counter } = this.state;
    const { step, min } = this.props;
    this.setState({
      counter: counter === min ? counter : counter - step,
    });
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { className, step, max, min, width, appearance } = this.props;
    const { counter } = this.state;

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
        <Button appearance={appearance} onClick={this.decrement}>
          -
        </Button>
        <NumberInput value={counter} width={width} />
        <Button appearance={appearance} onClick={this.increment}>
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
      border-right: 0;
    }

    &:nth-child(n):not(:first-of-type) {
      border-left: 0;
    }

    &:last-of-type {
      border-top-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-left: 0;
    }
  }

  ${Container} {
    border-radius: 0;
    &:focus,
    &:active {
      border: none;
      border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
    }
  }

  ${InputElement} {
    border-radius: 0;
    &:focus {
      border: none;
    }
  }
`;
