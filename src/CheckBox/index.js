/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../Icon';
import Theme from '../Theme';
import { Label, HiddenCheckbox, StyledCheckbox } from './elements';

/**
 * A CheckBox depicts a binary state if used alone, just as a ToggleButton, the difference being
 * that ToggleButton triggers the callback with the new state value, whereas the CheckBox
 * just triggers the callback without any argument so the parent needs to keep track by itself.
 *
 * @return {jsx}
 */

class CheckBox extends PureComponent {
  /** Internal state. */
  state = {
    isChecked: this.props.isDefaultChecked, // eslint-disable-line
  };

  /**
   * Returns true if requested prop exists
   *
   * @param {string} prop - requested property name
   *
   * @return {boolean}
   */
  isControlled = prop => {
    const props = this.props;

    return props.hasOwnProperty(prop);
  };

  /**
   * Returns the value a property from props if prop exists and from state otherwise
   *
   * @param {string} key - requested property name
   *
   * @return {*} value of the property
   */
  getControllableValue = key => {
    const props = this.props;
    const state = this.state;

    return this.isControlled(key) ? props[key] : state[key];
  };

  /**
   * Handle Change
   * fired when checkbox is triggered and state changes.
   */
  handleChange = () => {
    const { onChange, isDisabled } = this.props;

    if (isDisabled) {
      return;
    }

    const isChecked = this.getControllableValue('isChecked');

    if (this.isControlled('isChecked')) {
      onChange && onChange(!isChecked);
    } else {
      this.setState({ isChecked: !isChecked }, () => {
        onChange && onChange(!isChecked);
      });
    }
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { className, children, isDisabled, value } = this.props;
    const isChecked = this.getControllableValue('isChecked');

    return (
      <div className={className} data-testid="checkBox">
        <Label isDisabled={isDisabled} isChecked={isChecked} data-testid="checkBox-label">
          <HiddenCheckbox
            data-testid="hidden-checkBox"
            isChecked={isChecked}
            isDisabled={isDisabled}
            onChange={this.handleChange}
            tabIndex={isDisabled ? -1 : 0}
            value={value}
          />
          <StyledCheckbox isChecked={isChecked} data-testid="styled-checkBox">
            <Icon name="check-mark" color={Theme.palette.white} width="10px" height="10px" />
          </StyledCheckbox>
          {children}
        </Label>
      </div>
    );
  }
}

/** Prop types. */
CheckBox.propTypes = {
  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: PropTypes.node,

  /**
   * ClassName needed by styled components
   */
  className: PropTypes.string,

  /**
   * Specifies whether the checkbox is checked by default
   */
  isDefaultChecked: PropTypes.bool,

  /**
   * Specifies whether the checkbox is checked
   */
  // eslint-disable-next-line react/no-unused-prop-types
  isChecked: PropTypes.bool,

  /**
   * Specifies whether the checkbox is disabled
   */
  isDisabled: PropTypes.bool,

  /**
   * Callback triggered on CheckBox state change
   */
  onChange: PropTypes.func,

  /**
   * The value to be used in the checkbox input. This is the value that will be returned on form submission.
   */
  value: PropTypes.string,
};

/** Default props. */
CheckBox.defaultProps = {
  children: null,
  className: '',
  isDefaultChecked: false,
  isDisabled: false,
  onChange: null,
  value: '',
};

export default styled(CheckBox)`
  width: 100%;
`;
