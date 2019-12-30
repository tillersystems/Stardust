import React from 'react';
import PropTypes from 'prop-types';

import { RadioOption as OptionElement, Radio } from '../elements';

const RadioOption = ({ className, disabled, label, onChange, value, values }) => (
  <OptionElement role="menuitem" className={className} onClick={() => onChange(value)}>
    <Radio disabled={disabled} value={value} selectedValue={values[0]}>
      {label}
    </Radio>
  </OptionElement>
);

const { array, bool, func, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
RadioOption.propTypes = {
  className: string,
  disabled: bool,
  label: string.isRequired,
  onChange: func.isRequired,
  value: string.isRequired,
  values: array.isRequired,
};

/**
 * Default props
 */
RadioOption.defaultProps = {
  className: '',
  disabled: false,
};

export default RadioOption;
