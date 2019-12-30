import React from 'react';
import PropTypes from 'prop-types';

import { SimpleOption as OptionElement } from '../elements';

const SimpleOption = ({ className, disabled, isChecked, label, onChange, value, values }) => {
  return (
    <OptionElement
      className={className}
      disabled={disabled}
      isChecked={isChecked !== null ? isChecked : values.includes(value)}
      onClick={() => !disabled && onChange(value)}
    >
      {label}
    </OptionElement>
  );
};

const { array, bool, func, node, oneOfType, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
SimpleOption.propTypes = {
  value: string.isRequired,
  className: string,
  disabled: bool,
  isChecked: bool,
  label: oneOfType([node, string]).isRequired,
  onChange: func.isRequired,
  values: array,
};

/**
 * Default props
 */
SimpleOption.defaultProps = {
  className: '',
  disabled: false,
  values: [],
  isChecked: null,
};

export default SimpleOption;
