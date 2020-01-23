import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import RadioButton from '../../RadioButton';

import { memoItem } from '../helpers';
import { RadioOption as OptionElement } from '../elements';

const RadioOption = ({ className, disabled, label, onChange, value, isSelected }) => {
  const handleClick = useCallback(() => !disabled && onChange(value), [disabled, onChange, value]);

  return (
    <OptionElement disabled={disabled} className={className} onClick={handleClick}>
      <RadioButton.Bullet isChecked={isSelected} />
      {label}
    </OptionElement>
  );
};

const { bool, func, node, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
RadioOption.propTypes = {
  className: string,
  disabled: bool,
  label: node.isRequired,
  onChange: func.isRequired,
  value: node.isRequired,
  isSelected: bool,
};

/**
 * Default props
 */
RadioOption.defaultProps = {
  className: '',
  disabled: false,
  isSelected: false,
};

export default memoItem(RadioOption);
