import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { HeaderButton, HeaderContent } from './elements';

/**
 * SearchBar
 *
 * This component is in charge of displaying
 * a search bar
 *
 * @param {array} values // The currently selected values
 * @param {function} onClick // Callback function called when button is clicked
 * @param {bool} isOpen // When popover is open
 * @param {string} placeholder // Placeholder of button when no value is selected
 *
 * @return {jsx}
 */
const Header = ({ disabled, options, displayValue, values, onClick, isOpen, placeholder }) => {
  const selectedOptions = values
    .map(value => options.find(option => option.value === value))
    .filter(Boolean);

  return (
    <HeaderButton
      disabled={disabled}
      onClick={onClick}
      aria-haspopup="true"
      aria-expanded={isOpen}
      data-testid="select-button"
    >
      <HeaderContent>
        {displayValue}
        {!displayValue &&
          (values.length
            ? selectedOptions.map(({ value, label }, index) => (
                <Fragment key={value}>
                  {index > 0 && ', '}
                  {label}
                </Fragment>
              ))
            : placeholder)}
      </HeaderContent>
    </HeaderButton>
  );
};

const { array, bool, func, node, oneOfType, string } = PropTypes;

/** Prop types. */
Header.propTypes = {
  disabled: bool,
  options: array,
  isOpen: bool,
  values: array,
  displayValue: oneOfType([node, string]),
  onClick: func.isRequired,
  placeholder: string,
};

/** Default props. */
Header.defaultProps = {
  disabled: false,
  isOpen: false,
  options: [],
  values: [],
  displayValue: null,
  placeholder: '',
};

export default Header;
