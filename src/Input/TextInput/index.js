import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import Status from '../Status';
import Label from '../Label';
import { Container, InputElement } from './elements';

/**
 * Gets status name from status flags.
 *
 * @param {loading} loading - Loading flag.
 * @param {boolean} info - Info flag.
 * @param {boolean} success - Success flag.
 * @param {boolean} warning - Warning flag.
 * @param {error} error - Error flag.
 * @param {search} search - Search flag.
 *
 * @return The status.
 */
const getStatus = (loading, info, success, warning, error, search) => {
  if (loading) return 'loading';
  if (info) return 'info';
  if (success) return 'success';
  if (warning) return 'warning';
  if (error) return 'error';
  if (search) return 'search';
};

/**
 * Defines a text input. Extra datas can be added, such as an Icon, or plain text, that will both be displayed
 * either on the left or on the right of the actual text input.
 * Custom styles to inform about the status of the input (convenient if used in a form) or its purpose
 * can also be added through the props available on the TextInput.
 *
 * @returns {jsx}
 */
class TextInput extends PureComponent {
  /** Reference to the inner input element. */
  inputRef = createRef();

  /** Internal state. */
  state = {
    // Used for displaying the value in the "native" input (inner input).
    // If the component is used by default, this state is updated by the "native" input. If the
    // component is a controlled component, this value is managed by the user.
    value: this.props.value, // eslint-disable-line react/destructuring-assignment

    // State to bubble up focus from "native" input to the whole container.
    hasFocus: false,

    // Keeps track of the cursor's position for controlled input.
    cursorPosition: 1,
  };

  /**
   * Handles update of component.
   *
   * This method checks whether the value has changed and eventually updates the cursor's position
   * of the native input.
   *
   * @param {Object} prevProps - The previous component's props.
   */
  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({ value }, () => {
        const { cursorPosition } = this.state;

        this.inputRef.selectionStart = cursorPosition;
        this.inputRef.selectionEnd = cursorPosition;
      });
    }
  }

  /**
   * Handles change of value in "native" input.
   *
   * @param {Object} e - The native event.
   */
  handleChange = e => {
    const { disabled, value: propValue, onChange } = this.props;
    const { value: eventValue, selectionStart: cursorPosition } = e.target;

    if (!disabled) {
      // We constrained to check for nullity since its the only mean to actually ensure that no
      // value was given via prop.
      const value = propValue == null ? eventValue : propValue;
      this.setState({ value, cursorPosition }, () => {
        onChange(eventValue);
      });
    }
  };

  /**
   * Handles focus event on "native" input.
   */
  handleFocus = () => {
    const { onFocus, _onFocus } = this.props;

    this.setState({ ...this.state, hasFocus: true }, () => {
      onFocus();
      _onFocus();
    });
  };

  /**
   * Handles blur event on "native" input.
   */
  handleBlur = () => {
    const { onBlur, _onBlur } = this.props;
    this.setState({ ...this.state, hasFocus: false }, () => {
      onBlur();
      _onBlur();
    });
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { value, hasFocus } = this.state;
    const {
      className,
      width,
      fluid,
      id,
      tabIndex,
      placeholder,
      disabled,
      label,
      labelPosition,
      loading,
      info,
      ghost,
      success,
      warning,
      error,
      search,
      type,
    } = this.props;

    // We want to display loading status whether the input is disabled or not.
    // Other status are however omited in case the input is disabled.
    const hasStatus = loading || (!disabled && (success || info || warning || error || search));

    return (
      <Container
        className={className}
        width={fluid ? '100%' : width}
        hasFocus={hasFocus}
        disabled={disabled}
        info={info}
        success={success}
        warning={warning}
        error={error}
        ghost={ghost}
        data-testid="input-container"
      >
        {label && labelPosition === 'left' && <Label label={label} position="left" />}
        <InputElement
          data-testid="input"
          ref={ref => (this.inputRef = ref)}
          type={type}
          id={id}
          tabIndex={tabIndex}
          value={value || ''}
          placeholder={placeholder}
          disabled={disabled}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {hasStatus && (
          <Status
            hasFocus={hasFocus}
            status={getStatus(loading, info, success, warning, error, search)}
          />
        )}
        {label && labelPosition === 'right' && <Label label={label} position="right" />}
      </Container>
    );
  }
}

const { bool, func, oneOf, shape, string } = PropTypes;

/** Display name. */
TextInput.displayName = 'TextInput';

/** Props types validation. */
TextInput.propTypes = {
  /**
   * className needed by styled components
   */
  className: string,

  /**
   * Whether the input is disabled or not
   */
  disabled: bool,

  /**
   * Whether the input has error status
   */
  error: bool,

  /**
   * Whether the input takes all available space or not
   */
  fluid: bool,

  /**
   * Whether to display an input without border
   */
  ghost: bool,

  /**
   * ID of the input in the DOM
   */
  id: string,

  /**
   * Whether the input has info status
   */
  info: bool,

  /**
   * Object defining the label with either `icon` with the name of the icon to display, or
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
   * Whether the input has loading status
   */
  loading: bool,

  /**
   * Handler when input loses focus
   */
  onBlur: func,

  /**
   * Handler on input value change
   */
  onChange: func,

  /**
   * Handler when input gains focus
   */
  onFocus: func,

  /**
   * placeholder text
   */
  placeholder: string,

  /**
   * Whether the input has search status
   */
  search: bool,

  /**
   * Whether the input has success status
   */
  success: bool,

  /**
   * The tabulation index of the input in its parent form.
   */
  tabIndex: string,

  /**
   * Type of the text input
   */
  type: oneOf(['password', 'text']),

  /**
   * Value of the text input
   */
  value: string,

  /**
   * Whether the input has warning status
   */
  warning: bool,

  /**
   * The width of the input as a string (includes either 'px' or 'rem')
   */
  width: string,

  /**
   * Internal handler when input gains focus
   */
  _onFocus: func,

  /**
   * Internal handler when input loses focus
   */
  _onBlur: func,
};

/** Default props. */
TextInput.defaultProps = {
  className: '',
  disabled: false,
  error: false,
  fluid: false,
  ghost: false,
  id: '',
  info: false,
  label: null,
  labelPosition: 'left',
  loading: false,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '',
  search: false,
  success: false,
  tabIndex: '0',
  type: 'text',
  value: null,
  width: '25rem',
  warning: false,
  _onBlur: () => {},
  _onFocus: () => {},
};

export default TextInput;
