import React, { Children } from 'react';
import PropTypes from 'prop-types';

import { HeaderButton, HeaderContent } from './elements';

/**
 * SearchBar
 *
 * This component is in charge of displaying
 * a search bar
 *
 * @param {bool} disabled - If button is disabled
 * @param {function} onClick - Callback function called when button is clicked
 * @param {bool} isOpen - When popover is open
 * @param {string} placeholder - Placeholder of button when no value is selected
 * @param {node} children - The content of Header
 *
 * @return {jsx}
 */
const Header = ({ disabled, onClick, isOpen, placeholder, children }) => {
  // Remove empty children to ensure placeholder is display if empty
  const filteredChildren = Children.toArray(children).filter(Boolean);

  return (
    <HeaderButton
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-haspopup="true"
      aria-expanded={isOpen}
      data-testid="select-button"
    >
      <HeaderContent>{filteredChildren.length ? filteredChildren : placeholder}</HeaderContent>
    </HeaderButton>
  );
};

const { bool, func, node, string } = PropTypes;

/** Prop types. */
Header.propTypes = {
  children: node,
  disabled: bool,
  isOpen: bool,
  onClick: func.isRequired,
  placeholder: string,
};

/** Default props. */
Header.defaultProps = {
  children: null,
  disabled: false,
  isOpen: false,
  placeholder: '',
};

export default Header;
