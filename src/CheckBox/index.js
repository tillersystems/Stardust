import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Icon } from '..';
import Theme from '../Theme';
import { BoxContainer, Label } from './elements';

/**
 * CheckBox
 *
 * This component is in charge of displaying
 * a checkBox
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // Add a text aside in the select next the selected value.
 * @param {boolean} checked // Specifies whether the checkbox is selected.
 * @param {boolean} disabled // Specifies whether the checkbox is disabled.
 * @param {function} onChange // Callback whence clicked.
 * @param {string} value // The value to be used in the checkbox input. This is the value that will be returned on form submission.
 *
 * @return {jsx}
 */

class CheckBox extends PureComponent {
  /** Prop types. */
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    className: '',
    checked: false,
    disabled: false,
    onChange: null,
    value: '',
  };

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

    // Update state only if props are changed
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
    const { checked } = this.state;

    if (disabled) {
      return;
    }

    this.setState({ checked: !checked }, () => {
      onChange;
    });
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
        <Label disabled={disabled} checked={checked}>
          <BoxContainer checked={checked} disabled={disabled} data-testid="checkBoxContainer">
            {checked && (
              <Icon name="check-mark" color={Theme.palette.white} width="1rem" height="1rem" />
            )}
            <input
              type="checkbox"
              data-testid="checkBoxInput"
              onClick={
                // prevents clicking on the label trigging the event twice
                event => event.stopPropagation()
              }
              tabIndex={disabled ? -1 : 0}
              checked={checked}
              disabled={disabled}
              onChange={this.handleChange}
              value={value}
            />
          </BoxContainer>
          {children}
        </Label>
      </div>
    );
  }
}

export default styled(CheckBox)`
  width: 100%;
`;
