import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Icon } from '..';
import Theme from '../Theme';
import { BoxContainer, Label } from './elements';

/**
 * Checkbox
 *
 * This component is in charge of displaying
 * a checkbox
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // Add a text aside in the select next the selected value.
 * @param {bool} checked // Specifies whether the checkbox is selected.
 * @param {bool} defaultChecked // Specifies the initial state: whether or not the checkbox is selected.
 * @param {bool} disabled // Specifies whether the checkbox is disabled.
 * @param {func} onChange // Callback fired when checkbox is triggered and state changes.
 *
 * @return {jsx}
 */
class CheckBox extends PureComponent {
  /** Prop types. */
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    className: '',
    defaultChecked: false,
    checked: undefined,
    disabled: false,
    onChange: null,
  };

  /** Internal state. */
  state = {
    checked: this.props.defaultChecked, // eslint-disable-line
  };

  /**
   * Handle Change
   * fired when checkbox is triggered and state changes.
   */
  handleChange = () => {
    const { onChange, disabled } = this.props;
    const checked = !this.isChecked();

    if (disabled) {
      return;
    }

    this.setState({ checked }, () => {
      onChange && onChange;
    });
  };

  /**
   * isChecked
   *
   * @return {boolean}
   */
  isChecked() {
    const { checked } = this.props;

    return checked || this.state.checked; // eslint-disable-line
  }

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { checked } = this.state;
    const { className, children, id, defaultChecked, disabled, ...rest } = this.props;

    return (
      <div className={className} {...rest}>
        <Label disabled={disabled} checked={checked}>
          <BoxContainer checked={checked} disabled={disabled}>
            {checked && (
              <Icon name="check-mark" color={Theme.palette.white} width="1rem" height="1rem" />
            )}
            <input
              type="checkbox"
              tabIndex={disabled ? -1 : 0}
              defaultChecked={defaultChecked}
              disabled={disabled}
              onChange={this.handleChange}
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
