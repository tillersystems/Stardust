import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import Status from './Status';
import Label from './Label';
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
 * Defnes an input component.
 */
class Input extends PureComponent {
  /** Reference to the inner input element. */
  inputRef = createRef();

  /** Display name. */
  static displayName = 'Input';

  /** Prop types. */
  static propTypes = {
    // Size related props.
    width: PropTypes.string,
    fluid: PropTypes.bool,

    // Element related props.
    id: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.string,
    placeHolder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    // Label related props.
    label: PropTypes.string,
    labelPosition: PropTypes.oneOf(['left', 'right']),

    // Status related props.
    loading: PropTypes.bool,
    info: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
    error: PropTypes.bool,
    search: PropTypes.bool,

    // Internal event handlers.
    // These are used by Form.Field components to highlight
    // the label on focus.
    _onFocus: PropTypes.func,
    _onBlur: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    width: '25rem',
    fluid: false,

    type: 'text',
    id: '',
    value: null,
    tabIndex: '0',
    placeHolder: '',
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

  componentDidUpdate(prevProps) {
    const { type, value } = this.props;
    if (value !== prevProps.value) {
      this.setState({ ...this.state, value }, () => {
        const { cursorPosition } = this.state;

        if (type !== 'number') {
          this.inputRef.selectionStart = cursorPosition;
          this.inputRef.selectionEnd = cursorPosition;
        }
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
      const value = propValue || eventValue;
      this.setState({ ...this.state, value, cursorPosition }, () => {
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
      width,
      fluid,
      type,
      id,
      tabIndex,
      placeHolder,
      disabled,
      label,
      labelPosition,
      loading,
      info,
      success,
      warning,
      error,
      search,
    } = this.props;

    // We want to display loading status whether the input is disabled or not.
    // Other status are however omited in case the input is disabled.
    const hasStatus = loading || (!disabled && (success || info || warning || error || search));

    return (
      <Container
        width={fluid ? '100%' : width}
        hasFocus={hasFocus}
        disabled={disabled}
        info={info}
        success={success}
        warning={warning}
        error={error}
      >
        {label && labelPosition === 'left' && <Label icon={label} position="left" />}
        <InputElement
          innerRef={ref => (this.inputRef = ref)}
          type={type}
          id={id}
          tabIndex={tabIndex}
          value={value || ''}
          placeholder={placeHolder}
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
        {label && labelPosition === 'right' && <Label icon={label} position="right" />}
      </Container>
    );
  }
}

export default Input;
