import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { memoItem } from '../helpers';
import { SimpleOption as OptionElement } from '../elements';

const SimpleOption = ({ className, disabled, label, onChange, value, isSelected }) => {
  const handleClick = useCallback(() => !disabled && onChange(value), [disabled, onChange, value]);

  return (
    <OptionElement
      role="menuitem"
      className={className}
      disabled={disabled}
      isChecked={isSelected}
      onClick={handleClick}
    >
      {label}
    </OptionElement>
  );
};

const { bool, func, node, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
SimpleOption.propTypes = {
  value: node.isRequired,
  className: string,
  disabled: bool,
  isSelected: bool,
  label: node.isRequired,
  onChange: func.isRequired,
};

/**
 * Default props
 */
SimpleOption.defaultProps = {
  className: '',
  disabled: false,
  isSelected: null,
};

export default memoItem(SimpleOption);
