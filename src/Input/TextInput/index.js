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
 * Defines a text input. This is basically a convenience component around RawInput.
 *
 * @param {string} width - The width of the input as a string (includes either 'px' or 'rem').
 * @param {boolean} fluid - Whether the component is fluid or not.
 * @param {string} id - The ID of the input in the DOM.
 * @param {string} type - The type of the input (either 'password' or 'text')
 * @param {string} tabIndex - The tabulation index of the input in its parent form.
 * @param {string} placeholder - The string to display as a placeholder.
 * @param {boolean} disabled - Whether the input is disabled or not.
 * @param {string} label - The name of the icon to display as a label (if left undefined, not label
 * will be rendered).
 * @param {string} labelPosition - The position of the label (can be either 'left' or 'right').
 * @param {boolean} loading - Whether to display an input that is loading or not.
 * @param {boolean} success - Whether to display an input that is successful or not.
 * @param {boolean} warning - Whether to display an input that is warning or not.
 * @param {boolean} info - Whether to display an input that is an info or not.
 * @param {boolean} error - Whether to display an input that has failed or not.
 * @param {boolean} ghost - Whether to display an input with no border.
 * @param {boolean} search - Whether to display an input that meant for search or not.
 * @param {string} value - The value of the input. If provided, switches to controlled mode.
 * @param {func} onChange - The callback to call when the value of the input is changed.
 * @param {func} onFocus - The callback to call when the input gains focus.
 * @param {func} onBlur - The callback to call when the input looses focus.
 *
 * @returns {jsx}
 */
class TextInput extends PureComponent {
  /** Reference to the inner input element. */
  inputRef = createRef();

  /** Display name. */
  static displayName = 'TextInput';

  /** Props types validation. */
  static propTypes = {
    // className needed by styled components.
    className: PropTypes.string,

    // Size related props.
    width: PropTypes.string,
    fluid: PropTypes.bool,

    // Element related props.
    id: PropTypes.string,
    type: PropTypes.oneOf(['password', 'text']),
    value: PropTypes.string,
    tabIndex: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    // Label related props.
    label: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
    }),
    labelPosition: PropTypes.oneOf(['left', 'right']),

    // Status related props.
    loading: PropTypes.bool,
    info: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
    error: PropTypes.bool,
    search: PropTypes.bool,
    ghost: PropTypes.bool,

    // Internal event handlers.
    _onFocus: PropTypes.func,
    _onBlur: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    className: '',

    width: '25rem',
    fluid: false,

    id: '',
    type: 'text',
    value: null,
    tabIndex: '0',
    placeholder: '',
    disabled: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},

    label: null,
    labelPosition: 'left',

    loading: false,
    info: false,
    success: false,
    warning: false,
    error: false,
    search: false,
    ghost: false,

    _onFocus: () => {},
    _onBlur: () => {},
  };

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

export default TextInput;
