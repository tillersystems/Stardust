import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { TextInput } from '../..';

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
    const { value } = this.props;
    if (value) {
      this.setState({ rawValue: `${value}` }, () => {
        this.updateValue(value);
      });
    }
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Handles updated step in component's lifecycle.
   *
   * @param {Object} prevProps - The component's previous props.
   */
  componentDidUpdate({ value: prevValue }) {
    const { value: currValue } = this.props;

    if (currValue != prevValue) {
      this.updateValue(currValue);
    }
  }

  /**
   * Handles unmounting step in component's lifecycle.
   */
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Checks whether the given value is a string of a number or not.
   *
   * @param {string} rawValue - The string to check.
   *
   * @return {boolean} true if the given string is a number, false otherwise.
   */
  isNumber = rawValue => {
    const { separator } = this.props;
    return new RegExp(`^-?\\d+(${escapeSeparator(separator)}\\d+)?$`).test(rawValue);
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

    this.setState({ parsedValue }, () => {
      onChange(parsedValue);
    });
  };

  /**
   * Formats the given value into a displayable string in the inner TextInput.
   *
   * @returns {string}
   */
  formatValue = () => {
    const { rawValue, parsedValue } = this.state;
    const { decimals, separator } = this.props;

    return rawValue
      ? (parsedValue !== null ? parsedValue.toFixed(decimals) : rawValue).replace('.', separator)
      : rawValue;
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

    this.setState({ rawValue }, () => {
      this.updateValue(parsedValue);
    });
  };

  /**
   * Handles focus on the inner TextInput.
   */
  handleFocus = () => {
    const { onFocus, _onFocus } = this.props;
    this.setState({ hasFocus: true }, () => {
      onFocus();
      _onFocus();
    });
  };

  /**
   * Handles blur on the inner TextInput.
   */
  handleBlur = () => {
    const { onBlur, _onBlur } = this.props;
    this.setState({ hasFocus: false }, () => {
      onBlur();
      _onBlur();
    });
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
        this.updateValue(parsedValue + step);
      }

      if (event.code === 'ArrowDown') {
        this.updateValue(parsedValue - step);
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
    const {
      width,
      fluid,
      id,
      tabIndex,
      disabled,
      label,
      labelPosition,
      validate,
      info,
      success,
      warning,
      error,
      placeholder,
      ...rest
    } = this.props;

    const hasValidValue = this.isNumber(rawValue);

    return (
      <TextInput
        {...rest}
        placeholder={placeholder}
        width={width}
        fluid={fluid}
        id={id}
        tabIndex={tabIndex}
        disabled={disabled}
        value={this.formatValue()}
        label={label}
        labelPosition={labelPosition}
        info={info}
        success={success || (validate && hasValidValue)}
        warning={warning}
        error={error || (validate && !hasValidValue)}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }
}

const { bool, func, number, oneOf, shape, string } = PropTypes;

/** Display name. */
NumberInput.displayName = 'NumberInput';

/** Prop types validation. */
NumberInput.propTypes = {
  /**
   * Numbers of decimals the input value has to display.
   */
  decimals: number,

  /**
   *  Whether the input is disabled or not
   */
  disabled: bool,

  /**
   * whether the input has error status
   */
  error: bool,

  /**
   * Whether the input takes all available space or not
   */
  fluid: bool,

  /**
   * The ID of the input
   */
  id: string,

  /**
   * Whether the input has info status
   */
  info: bool,

  /**
   * Defines the label with either `icon` with the name of the icon to display, or
   * `text` with the text to display
   */
  label: shape({
    icon: string,
    text: string,
  }),

  /**
   * Position of label (`left` or `right`)
   */
  labelPosition: oneOf(['left', 'right']),

  /**
   * Maximum value of the number value
   */
  max: number,

  /**
   * Mimimum value of the number value
   */
  min: number,

  /**
   * Handler when input loses focus
   */
  onBlur: func,

  /**
   * Handler of input value change
   */
  onChange: func,

  /**
   * Handler when input gains focus
   */
  onFocus: func,

  /**
   * Placeholder text
   */
  placeholder: string,

  /**
   * What will separate the integer part from the decimals. Default value depends from user browser
   */
  separator: string,

  /**
   * Value of increment or decrement when using arrow keys
   */
  step: number,

  /**
   * Whether the input has success status
   */
  success: bool,

  /**
   * Index of the input in a parent form
   */
  tabIndex: string,

  /**
   * Whether the input has to be checked for validation or not
   */
  validate: bool,

  /**
   * The value of the input
   */
  value: number,

  /**
   * Whether the input has warning status
   */
  warning: bool,

  /**
   * The width of the input
   */
  width: string,

  /**
   * Internal handler when input loses focus
   */
  _onBlur: func,

  /**
   * Internal handler when input gains focus
   */
  _onFocus: func,
};

/** Default props. */
NumberInput.defaultProps = {
  decimals: 0,
  disabled: false,
  error: false,
  fluid: false,
  id: '',
  info: false,
  label: null,
  labelPosition: 'left',
  max: null,
  min: null,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '0',
  separator: getLocaleSeparator(),
  step: 1,
  success: false,
  tabIndex: '0',
  validate: false,
  value: null,
  warning: false,
  width: '25rem',
  _onFocus: () => {},
  _onBlur: () => {},
};

export default NumberInput;
