import React from 'react';
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

const ToggleButton = ({ className, checked, disabled, onToggle }) => (
  <div className={className} onClick={() => !disabled && onToggle && onToggle(!checked)}>
    <Checkbox type="checkbox" checked={checked} readOnly />
    <Toggle checked={checked} readOnly={disabled} />
  </div>
);

ToggleButton.propTypes = {
  className: PropTypes.string,
  onToggle: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

ToggleButton.defaultProps = {
  className: '',
  onToggle: null,
  checked: false,
  disabled: false,
};

export default styled(ToggleButton)`
  display: inline-block;

  position: relative;

  height: 1.8rem;

  vertical-align: middle;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
