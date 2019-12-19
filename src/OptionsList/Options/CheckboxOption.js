import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Option } from '../elements';
import { CheckBox } from '../..';

const CheckboxOption = ({ className, disabled, isChecked, label, onChange, value, values }) => {
  return (
    <Option role="menuitem" className={className}>
      <CheckBox
        disabled={disabled}
        value={value}
        onChange={() => onChange(value)}
        isChecked={isChecked !== null ? isChecked : values.includes(value)}
      >
        {label}
      </CheckBox>
    </Option>
  );
};

const { array, bool, func, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
CheckboxOption.propTypes = {
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
CheckboxOption.defaultProps = {
  className: '',
  disabled: false,
  values: [],
  isChecked: null,
};

export default styled(CheckboxOption)`
  label {
    padding: 0.8rem 1.6rem;
    :hover {
      background: ${({ theme: { palette } }) => palette.veryLightGrey};
    }
  }
`;
