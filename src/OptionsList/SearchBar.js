import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../Input/TextInput';

import { SearchInputContainer, SearchInput } from './elements';

/**
 * SearchBar
 *
 * This component is in charge of displaying
 * a search bar
 *
 * @param {string} className // Add a text aside in the select next the selected value.
 * @param {function} onChange // Callback function called when text input change.
 * @param {string} placeholder // Input placeholder.
 * @param {string} value // Input value.
 *
 * @return {jsx}
 */

const SearchBar = ({ className, placeholder, value, onChange }) => (
  <SearchInputContainer>
    <SearchInput className={className}>
      <TextInput
        ghost
        data-test="search-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fluid
        search
      />
    </SearchInput>
  </SearchInputContainer>
);

const { func, string } = PropTypes;
/** Prop types. */
SearchBar.propTypes = {
  className: string,
  onChange: func.isRequired,
  placeholder: string,
  value: string,
};

/** Default props. */
SearchBar.defaultProps = {
  className: '',
  placeholder: '',
  value: '',
};

export default SearchBar;
