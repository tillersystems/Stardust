import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Option, Radio } from '../elements';

const RadioOption = ({ className, disabled, label, onChange, value, values }) => (
  <Option role="menuitem" className={className} onClick={() => onChange(value)}>
    <Radio disabled={disabled} value={value} selectedValue={values[0]}>
      {label}
    </Radio>
  </Option>
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

export default styled(RadioOption)`
  padding: 0.8rem 1.6rem;

  &:first-child {
    padding-top: 1.2rem;
  }
  &:last-child {
    padding-bottom: 1.2rem;
  }
  :hover {
    background: ${({ theme: { palette } }) => palette.veryLightGrey};
  }
`;
