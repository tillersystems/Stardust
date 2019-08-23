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
    checked: this.props.checked, // eslint-disable-line react/destructuring-assignment
  };

  componentDidUpdate(prevProps) {
    const { checked } = this.props;

    if (checked !== prevProps.checked) {
      this.setState({ checked });
    }
  }

  /**
   * Handles Toggle of Button
   */
  handleToggle = () => {
    const { disabled, onToggle } = this.props;
    const { checked } = this.state;

    if (!disabled && onToggle) {
      onToggle(!checked);
    } else if (!disabled) {
      this.setState(prevState => ({ checked: !prevState.checked }));
    } else {
      return null;
    }
  };

  render() {
    const { className, disabled } = this.props;
    const { checked } = this.state;

    return (
      <div className={className} onClick={this.handleToggle}>
        <Checkbox type="checkbox" checked={checked} readOnly />
        <Toggle checked={checked} readOnly={disabled} data-testid="toggle-button" />
      </div>
    );
  }
}

/** Prop types. */
ToggleButton.propTypes = {
  /** Whether the button is checked or not */
  checked: PropTypes.bool,

  /** className needed by styled-components */
  className: PropTypes.string,

  /** Whether the button is disabled or not */
  disabled: PropTypes.bool,

  /** Callback when component is clicked */
  onToggle: PropTypes.func,
};

/** Default props. */
ToggleButton.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  onToggle: null,
};

export default styled(ToggleButton)`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-block;
  height: 2rem;
  position: relative;
  vertical-align: middle;
`;
