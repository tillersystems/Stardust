import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, NumberInput } from '..';

const { string, number } = PropTypes;

/**
 * Increment.
 *
 * This component is in charge of displaying
 * an increment group with minus and add button.
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // Add a text aside in the select next the selected value.
 *
 * @return {jsx}
 */
class Increment extends PureComponent {
  /**
   * PropTypes Validation.
   */
  static propTypes = {
    className: string,
    initialCount: number,
    step: number,
    max: number,
    min: number,
  };

  /**
   * Default props.
   */
  static defaultProps = {
    className: '',
    initialCount: 0,
    step: 1,
    max: 1000,
    min: 0,
  };

  state = {
    counter: 0,
  };

  increment = () => {
    const { counter } = this.state;
    const { step, max } = this.props;
    this.setState({
      counter: counter <= max ? counter : counter + step,
    });
  };

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
    const { className, initialCount } = this.props;
    const { counter } = this.state;

    return (
      <div role="group" className={className} tabIndex="-1" initialCount={initialCount}>
        <Button appearance="primary" onClick={this.increment}>
          +
        </Button>
        <NumberInput value={counter} />
        <Button appearance="primary" onClick={this.decrement}>
          -
        </Button>
      </div>
    );
  }
}

export default styled(Increment)`
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

    ${NumberInput} {
      border-radius: 0;
    }

`;
