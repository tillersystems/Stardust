import React from 'react';
import PropTypes from 'prop-types';

import { CheckBox } from '../..';
import { CheckboxOption as OptionElement } from '../elements';

const CheckboxOption = ({ className, disabled, isChecked, label, onChange, value, values }) => {
  return (
    <OptionElement role="menuitem" className={className}>
      <CheckBox
        disabled={disabled}
        value={value}
        onChange={() => onChange(value)}
        isChecked={isChecked !== null ? isChecked : values.includes(value)}
      >
        {label}
      </CheckBox>
    </OptionElement>
  );
};

const { array, bool, func, node, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
CheckboxOption.propTypes = {
  value: node.isRequired,
  className: string,
  disabled: bool,
  isChecked: bool,
  label: node.isRequired,
  onChange: func.isRequired,
  values: array,
};

/**
 * Default props
 */
CheckboxOption.defaultProps = {
  className: '',
  disabled: false,
  values: [],
  isChecked: null,
};

export default CheckboxOption;
