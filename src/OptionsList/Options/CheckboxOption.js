import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import CheckBox from '../../CheckBox';

import { memoItem } from '../helpers';
import { CheckboxOption as OptionElement } from '../elements';

const CheckboxOption = ({ className, disabled, label, onChange, value, isSelected }) => {
  const handleClick = useCallback(() => !disabled && onChange(value), [disabled, onChange, value]);

  return (
    <OptionElement role="menuitem" disabled={disabled} className={className} onClick={handleClick}>
      <CheckBox.Bullet isChecked={isSelected} />
      {label}
    </OptionElement>
  );
};

const { bool, func, node, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
CheckboxOption.propTypes = {
  value: node.isRequired,
  className: string,
  disabled: bool,
  label: node.isRequired,
  onChange: func.isRequired,
  isSelected: bool,
};

/**
 * Default props
 */
CheckboxOption.defaultProps = {
  className: '',
  disabled: false,
  isSelected: null,
};

export default memoItem(CheckboxOption);
