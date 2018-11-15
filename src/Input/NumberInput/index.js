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
    // - - - Size related props - - -
    width: PropTypes.string,
    fluid: PropTypes.bool,

    // - - - DOM element related props - - -
    id: PropTypes.string,
    tabIndex: PropTypes.string,

    // - - - Input related props - - -
    disabled: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    // - - - Appearance related props - - -
    label: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
    }),
    labelPosition: PropTypes.oneOf(['left', 'right']),
    validate: PropTypes.bool,

    // - - - Status related props - - -
    info: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
    error: PropTypes.bool,

    // - - - Number input related props - - -
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,

    // - - - Number format related props - - -
    decimals: PropTypes.number,
    separator: PropTypes.string,

    // - - - Internal event handlers - - -
    _onFocus: PropTypes.func,
    _onBlur: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    width: '25rem',
    fluid: false,

    id: '',
    tabIndex: '0',

    disabled: false,
    value: null,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},

    label: null,
    labelPosition: 'left',
    validate: false,

    info: false,
    success: false,
    warning: false,
    error: false,

    min: null,
    max: null,
    step: 1,
    decimals: 0,
    separator: getLocaleSeparator(),

    _onFocus: () => {},
    _onBlur: () => {},
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
   * Formats the given value into a displayable string in the inner TextInput.
   *
   * @returns {string}
   */
  formatValue = () => {
    const { rawValue, parsedValue } = this.state;
    const { decimals, separator } = this.props;

    return (parsedValue
      ? parsedValue.toFixed(decimals)
      : rawValue
        ? rawValue
        : (0).toFixed(decimals)
    ).replace('.', separator);
  };

  /**
   * Handles change in the inner TextInput.
   *
   * @param {string} rawValue - The new value of the inner TextInput.
   */
  handleChange = rawValue => {
    const { value, separator, onChange } = this.props;

    const parsedValue = this.isNumber(rawValue)
      ? parseFloat(rawValue.replace(separator, '.'))
      : null;

    if (value && this.isNumber(rawValue)) {
      onChange(parsedValue);
    } else {
      this.setState({ ...this.state, rawValue }, () => {
        this.updateValue(parsedValue);
      });
    }
  };

  /**
   * Handles focus on the inner TextInput.
   */
  handleFocus = () => {
    const { onFocus, _onFocus } = this.props;
    this.setState({ ...this.state, hasFocus: true }, () => {
      onFocus();
      _onFocus();
    });
  };

  /**
   * Handles blur on the inner TextInput.
   */
  handleBlur = () => {
    const { onBlur, _onBlur } = this.props;
    this.setState({ ...this.state, hasFocus: false }, () => {
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
    const { value, step } = this.props;

    // Checks if the input has focus since we connect the event listener to the window.
    if (!value && hasFocus) {
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
    } = this.props;

    const hasValidValue = this.isNumber(rawValue);

    return (
      <TextInput
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

export default NumberInput;
