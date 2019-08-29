/* eslint-disable react/no-unused-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Checkbox, Toggle } from './elements';

/**
 * A Toggle Button represents the switch between two states, on or off.
 *
 * @return {jsx}
 */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */

class ToggleButton extends PureComponent {
  /** Display name. */
  static displayName = 'ToggleButton';

  /** Internal state. */
  state = {
    isChecked: this.props.isDefaultChecked, // eslint-disable-line react/destructuring-assignment
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
   * Handles Toggle of Button
   */
  handleToggle = () => {
    const { isDisabled, onToggle } = this.props;
    const isChecked = this.getControllableValue('isChecked');

    if (isDisabled) return;

    if (this.isControlled('isChecked')) {
      onToggle && onToggle(!isChecked);
    } else {
      this.setState({ isChecked: !isChecked }, () => {
        onToggle && onToggle(!isChecked);
      });
    }
  };

  render() {
    const { className, isDisabled } = this.props;
    const isChecked = this.getControllableValue('isChecked');

    return (
      <div className={className} onClick={this.handleToggle}>
        <Checkbox type="checkbox" isChecked={isChecked} readOnly />
        <Toggle isChecked={isChecked} readOnly={isDisabled} data-testid="toggle-button" />
      </div>
    );
  }
}

/** Prop types. */
ToggleButton.propTypes = {
  /** className needed by styled-components */
  className: PropTypes.string,

  /** Whether the button is checked or not in controlled component */
  // eslint-disable-next-line react/require-default-props
  isChecked: PropTypes.bool,

  /** Whether the button is checked or not in uncontrolled component */
  isDefaultChecked: PropTypes.bool,

  /** Whether the button is disabled or not */
  isDisabled: PropTypes.bool,

  /** Callback when component is clicked */
  onToggle: PropTypes.func,
};

/** Default props. */
ToggleButton.defaultProps = {
  className: '',
  isDefaultChecked: false,
  isDisabled: false,
  onToggle: null,
};

export default styled(ToggleButton)`
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  display: inline-block;
  height: 2rem;
  position: relative;
  vertical-align: middle;
`;
