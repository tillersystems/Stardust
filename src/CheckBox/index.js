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
    checked: this.props.checked, // eslint-disable-line
  };

  /**
   * Component Did Update
   * Method invoked immediately after updating occur.
   */
  componentDidUpdate(prevProps) {
    const { checked } = this.props;

    // Update state only if props have changed
    if (prevProps.checked !== checked) {
      this.setState({
        checked,
      });
    }
  }

  /**
   * Handle Change
   * fired when checkbox is triggered and state changes.
   */
  handleChange = () => {
    const { onChange, disabled } = this.props;

    if (disabled) {
      return;
    }

    this.setState(
      prevState => ({ checked: !prevState.checked }),
      () => {
        onChange;
      },
    );
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { checked } = this.state;
    const { className, children, disabled, value, ...rest } = this.props;

    return (
      <div className={className} {...rest} data-testid="checkBox">
        <Label disabled={disabled} checked={checked} data-testid="checkBox-label">
          <HiddenCheckbox
            data-testid="hidden-checkBox"
            checked={checked}
            disabled={disabled}
            onChange={this.handleChange}
            tabIndex={disabled ? -1 : 0}
            value={value}
          />
          <StyledCheckbox checked={checked} data-testid="styled-checkBox">
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
   * Specifies whether the checkbox is checked
   */
  checked: PropTypes.bool,

  /**
   * Specifies whether the checkbox is disabled
   */
  disabled: PropTypes.bool,

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
  checked: false,
  disabled: false,
  onChange: null,
  value: '',
};

export default styled(CheckBox)`
  width: 100%;
`;
