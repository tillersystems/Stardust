import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Checkbox, Toggle } from './elements';

/**
 * Switch
 *
 * This component is in charge of displaying
 * a switch.
 *
 * @param {string} className // Class needed by styled component.
 * @param {bool} checked // Whether the button is checked or not.
 * @param {bool} disabled // Whether the button is disabled or not.
 * @param {func} onToggle // Callback whence clicked.
 *
 * @return {jsx}
 */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */

class ToggleButton extends PureComponent {
  /** Display name. */
  static displayName = 'ToggleButton';

  /** Prop types. */
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onToggle: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    className: '',
    checked: false,
    disabled: false,
    onToggle: null,
  };

  /** Internal state. */
  state = {
    checked: this.props.checked, // eslint-disable-line react/destructuring-assignment
  };

  componentDidUpdate(prevProps) {
    const { checked } = this.props;
    if (checked !== prevProps.checked) {
      this.setState({ ...this.state, checked });
    }
  }

  /**
   * Handles Toggle
   *
   * @param {boolean} checked
   */
  handleToogle = checked => {
    const { disabled, onToggle } = this.props;

    if (!disabled && onToggle) {
      onToggle(!checked);
    } else if (!disabled) {
      this.setState({ ...this.state, checked: !checked });
    } else {
      return null;
    }
  };

  render() {
    const { className, disabled } = this.props;
    const { checked } = this.state;
    return (
      <div className={className} onClick={() => this.handleToogle(checked)}>
        <Checkbox type="checkbox" checked={checked} readOnly />
        <Toggle checked={checked} readOnly={disabled} />
      </div>
    );
  }
}

export default styled(ToggleButton)`
  display: inline-block;

  position: relative;

  height: 1.8rem;

  vertical-align: middle;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
