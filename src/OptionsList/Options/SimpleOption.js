import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Option } from '../elements';

const SimpleOption = ({ className, disabled, isChecked, label, onChange, value, values }) => {
  return (
    <Option
      className={className}
      disabled={disabled}
      isChecked={isChecked !== null ? isChecked : values.includes(value)}
      onClick={() => !disabled && onChange(value)}
    >
      {label}
    </Option>
  );
};

const { array, bool, func, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
SimpleOption.propTypes = {
  value: string.isRequired,
  className: string,
  disabled: bool,
  isChecked: bool,
  label: string.isRequired,
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

export default styled(SimpleOption)`
  padding: 0.8rem 1.6rem;
  :hover {
    background: ${({ theme: { palette } }) => palette.veryLightGrey};
  }
`;
