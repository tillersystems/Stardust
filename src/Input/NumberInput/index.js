import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TextInput from '../TextInput';

/**
 * Gets the locale decimal separator character from the browser.
 *
 * @returns {string} The local decimal separator.
 */
function getLocaleSeparator() {
  return (1.1).toLocaleString().substring(1, 2);
}

function escapeSeparator(separator) {
  return separator === '.' ? '\\.' : separator;
}

class NumberInput extends PureComponent {
  /** Display name. */
  static displayName = 'NumberInput';

  /** Prop types validation. */
  static propTypes = {
    // - - - Input related props - - -
    value: PropTypes.number,
    onChange: PropTypes.func,

    // - - - Appearance related props - - -
    validate: PropTypes.bool,

    // - - - Number input related props - - -
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,

    // - - - Number format related props - - -
    decimals: PropTypes.number,
    separator: PropTypes.string,
  };

  /** Default props. */
  static defaultProps = {
    value: null,
    onChange: () => {},

    validate: false,

    min: null,
    max: null,
    step: 1,
    decimals: 0,
    separator: getLocaleSeparator(),
  };

  /** Internal state. */
  state = {
    // Raw value: This is the string used to control the inner input.
    rawValue: null,

    // Parsed value: This is the parsed number value from the raw value.
    parsedValue: null,

    // Whether the component has focus. This value is used to allow keyboard increase and decrease
    // of the value.
    hasFocus: false,
  };

  /**
   * Handles mounting step in component's lifecycle.
   */
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Handles unmounting step in component's lifecycle.
   */
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Formats the given value into a displayable string in the inner TextInput.
   *
   * @returns {string}
   */
  formatValue = () => {
    const { rawValue, parsedValue } = this.state;
    const { value, decimals, separator } = this.props;

    const displayedValue = value || parsedValue;

    return (displayedValue
      ? displayedValue.toFixed(decimals)
      : rawValue
        ? rawValue
        : (0).toFixed(decimals)
    ).replace('.', separator);
  };

  /**
   * Checks whether the given value is a string of a number or not.
   *
   * @param {string} rawValue - The string to check.
   *
   * @return {boolean} true if the given string is a number, false otherwise.
   */
  isNumber = rawValue => {
    const { separator } = this.props;
    return new RegExp(`^\\d+(${escapeSeparator(separator)}\\d+)?$`).test(rawValue);
  };

  /**
   * Updates the value of the component.
   * This method updates the parsed value in the component's internal state. In addition it checks
   * for validity of the new value; in case it is out of the configured bounds, it modifies it.
   *
   * @param {number} newParsedValue - The new value.
   */
  updateValue = newParsedValue => {
    const { onChange, min, max } = this.props;

    // Checks bounds.
    // Have to use value != null since 0 is equivalent to null boolean wise.
    let parsedValue = newParsedValue;
    if (min != null && newParsedValue < min) {
      parsedValue = min;
    } else if (max != null && newParsedValue > max) {
      parsedValue = max;
    }

    this.setState({ ...this.state, parsedValue }, () => {
      onChange(parsedValue);
    });
  };

  /**
   * Handles change in the inner TextInput.
   *
   * @param {string} rawValue - The new value of the inner TextInput.
   */
  handleChange = rawValue => {
    const { separator } = this.props;

    const parsedValue = this.isNumber(rawValue)
      ? parseFloat(rawValue.replace(separator, '.'))
      : null;

    this.setState({ ...this.state, rawValue }, () => this.updateValue(parsedValue));
  };

  /**
   * Handles focus on the inner TextInput.
   */
  handleFocus = () => {
    this.setState({ ...this.state, hasFocus: true });
  };

  /**
   * Handles blur on the inner TextInput.
   */
  handleBlur = () => {
    this.setState({ ...this.state, hasFocus: false });
  };

  /**
   * Handles keyboard's key down event.
   *
   * @param {KeyEvent} event - The keyboard event.
   */
  handleKeyDown = event => {
    const { hasFocus, parsedValue } = this.state;
    const { step } = this.props;

    // Checks if the input has focus since we connect the event listener to the window.
    if (hasFocus) {
      if (event.code === 'ArrowUp') {
        this.setState({ ...this.state, rawValue: this.formatValue() }, () => {
          this.updateValue(parsedValue + step);
        });
      }

      if (event.code === 'ArrowDown') {
        this.setState({ ...this.state, rawValue: this.formatValue() }, () => {
          this.updateValue(parsedValue - step);
        });
      }
    }
  };

  /**
   * Renders the component.
   *
   * @returns {jsx}
   */
  render() {
    const { rawValue } = this.state;
    const { validate } = this.props;

    const hasValidValue = this.isNumber(rawValue);

    return (
      <TextInput
        value={this.formatValue()}
        success={validate && hasValidValue}
        error={validate && !hasValidValue}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default NumberInput;
