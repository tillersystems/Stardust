import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import { DatePicker, Popover, TextInput } from '../..';
import { Container, DatePickerWrapper, PopoverContainer } from './elements';

/**
 * The DatePickerInput component is an input that toggles a popover with a date picker
 *
 * @param {luxon.DateTime} value - The currently selected date.
 * @param {Function} onChange - The callback to notify that the date changed.
 * @param {luxon.DateTime} minDate - Minimum allowed date.
 * @param {luxon.DateTime} maxDate - Maximum allowed date.
 *
 * @returns {jsx}
 */
class DatePickerInput extends PureComponent {
  // Ref to the component node for user click tracking
  ref = null;

  /** Internal state. */
  state = {
    isDatePickerOpen: false, // whether the date picker is displayed or not
    dateValue: null, // value passed down to the date picker
    textValue: null, // value displayed in the input text
    error: false, // whether input text should be displayed with an error state
  };

  /**
   * Component lifecycle method
   * Adds the listener allowing DatePicker display
   *
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
    const { value, error } = this.props;
    this.setState({
      dateValue: value || DateTime.local(),
      textValue: value || DateTime.local(),
      error,
    });
  }

  /**
   * Component lifecycle method
   * Handles error value according to what the parent component passes down
   * only if the update comes from prop change and not state change
   * since state change comes from inner state update in handleInputChange and handleDateChange
   *
   * @param {Object} prevProps - The component's previous props.
   * @param {Object} prevState - The component's previous state.
   */
  componentDidUpdate(prevProps, prevState) {
    const { error: currentErrorProp } = this.props;
    const { error } = this.state;

    if (prevState.error === error && prevProps.error !== currentErrorProp) {
      this.setState({ error: currentErrorProp });
    }
  }

  /**
   * Component lifecycle method
   * Removes the listener allowing DatePicker display
   *
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  /**
   * Toggles visibility of the date picker.
   * Closes the date picker if the user has clicked outside this component
   *
   * @param {Object} event - event on click
   */
  handleClick = event => {
    if (!event || (event && !this.ref.contains(event.target))) {
      this.setState({
        isDatePickerOpen: false,
      });
    }
  };

  /**
   * Handles change of date from DatePicker.
   *
   * @param {Object} dateValue - clicked date on date picker component
   */
  handleDateChange = dateValue => {
    const { onChange } = this.props;
    onChange(dateValue);

    this.setState({ dateValue, textValue: dateValue, isDatePickerOpen: false, error: false });
  };

  /**
   * Handles change of value from text input.
   * If the value is valid from a Luxon point of view, it will be passed to the calendar
   * Otherwise, we set the date value for the DatePicker to the current time.
   * Thus we keep the text and date values out of sync to allow the user to update the date
   * while keeping a valid date for the DatePicker
   * Validation can be handled higher with the callback
   *
   * @param {Object} textValue - text updated on TextInput
   */
  handleInputChange = textValue => {
    const { minDate, maxDate, onChange } = this.props;
    onChange(newValue);

    this.setState({ textValue });

    const [day, month, year] = textValue.split('/').map(v => parseInt(v, 10));
    const newValue = DateTime.fromObject({ year, month, day });
    if (
      day &&
      month &&
      year &&
      newValue.isValid &&
      (!maxDate || newValue <= maxDate) &&
      (!minDate || newValue >= minDate)
    ) {
      this.setState({ dateValue: newValue, error: false });
    } else {
      this.setState({ dateValue: DateTime.local(), error: true });
    }
  };

  /**
   * Renders the component.
   *
   * @returns {jsx}
   */
  render() {
    const { fluid, minDate, maxDate } = this.props;
    const { isDatePickerOpen, error, textValue, dateValue } = this.state;

    return (
      <Container innerRef={node => (this.ref = node)}>
        <TextInput
          fluid={fluid}
          value={textValue ? textValue.toLocaleString(DateTime.DATE_SHORT) : ''}
          type="text"
          onFocus={() => this.setState({ isDatePickerOpen: true })}
          onChange={this.handleInputChange}
          error={error}
        />
        <PopoverContainer>
          <Popover active={isDatePickerOpen} arrowPositionX="6rem">
            <DatePickerWrapper>
              <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                value={dateValue}
                onChange={this.handleDateChange}
              />
            </DatePickerWrapper>
          </Popover>
        </PopoverContainer>
      </Container>
    );
  }
}

const { bool, func, object } = PropTypes;
/** Prop types validation. */
DatePickerInput.propTypes = {
  fluid: bool,
  value: object,
  onChange: func,
  error: bool,
  maxDate: object,
  minDate: object,
};

/** Default props. */
DatePickerInput.defaultProps = {
  fluid: false,
  value: null,
  onChange: () => {},
  error: false,
  maxDate: null,
  minDate: null,
};

export default DatePickerInput;
