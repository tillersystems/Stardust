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
    isChecked: this.props.isChecked, // eslint-disable-line
  };

  /**
   * Component Did Update
   * Method invoked immediately after updating occur.
   */
  componentDidUpdate(prevProps) {
    const { isChecked } = this.props;

    // Update state only if props have changed
    if (prevProps.isChecked !== isChecked) {
      this.setState({
        isChecked,
      });
    }
  }

  /**
   * Handle Change
   * fired when checkbox is triggered and state changes.
   */
  handleChange = () => {
    const { onChange, isDisabled } = this.props;

    if (isDisabled) {
      return;
    }

    this.setState(
      prevState => ({ isChecked: !prevState.isChecked }),
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
    const { isChecked } = this.state;
    const { className, children, isDisabled, value, ...rest } = this.props;

    return (
      <div className={className} {...rest} data-testid="checkBox">
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
   * Specifies whether the checkbox is checked
   */
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
  isChecked: false,
  isDisabled: false,
  onChange: null,
  value: '',
};

export default styled(CheckBox)`
  width: 100%;
`;
