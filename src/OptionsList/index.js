/* eslint-disable react/require-default-props */

import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Options, NoResultDefaultComponent, SearchInputContainer } from './elements';
import SearchBar from './SearchBar';

import { CheckboxOption, RadioOption, SimpleOption } from './Options';

const OptionsList = ({
  allowMultiple,
  className,
  NoResult,
  onChange,
  OptionComponent,
  options,
  searchBarPlaceholder,
  searchMethod,
  toggleAllLabel,
  values,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Handle option change
   *
   * @param {string} value - value to toggle
   */
  const handleChange = useCallback(
    value => {
      let nextValues = values;
      if (!allowMultiple) {
        nextValues = [value];
      } else if (values.includes(value)) {
        nextValues = values.filter(v => v !== value);
      } else {
        nextValues = [...values, value];
      }
      onChange(nextValues);
    },
    [values, allowMultiple, onChange],
  );

  /**
   * Add or remove all values
   */
  const toggleAll = useCallback(() => {
    if (options.length === values.length) {
      onChange([]);
    } else {
      onChange(options.map(option => option.value));
    }
  }, [onChange, options, values.length]);

  /**
   * Return the list of options
   */
  const elements = useMemo(() => {
    const items = searchMethod ? searchMethod({ options, term: searchTerm }) : options;
    return items.map(({ value, label, disabled, value: key }) => {
      const props = {
        disabled,
        label,
        onChange: () => handleChange(value),
        value,
        values,
      };
      if (allowMultiple) {
        return OptionComponent !== null ? (
          <OptionComponent key={key} {...props} />
        ) : (
          <CheckboxOption key={key} {...props} />
        );
      } else {
        return OptionComponent !== null ? (
          <OptionComponent key={key} {...props} />
        ) : (
          <RadioOption key={key} {...props} />
        );
      }
    });
  }, [searchMethod, options, searchTerm, values, allowMultiple, handleChange, OptionComponent]);

  // change to NoResult
  // if function => result // sinon juste afficher le string
  const noResultMessage = useMemo(() => {
    if (elements.length > 0) {
      return null;
    } else if (typeof NoResult === 'function') {
      return <NoResult term={searchTerm} />;
    } else {
      return <NoResultDefaultComponent>{NoResult}</NoResultDefaultComponent>;
    }
  }, [NoResult, elements.length, searchTerm]);

  const shouldDisplayToggleAll =
    searchTerm.length === 0 && allowMultiple && toggleAllLabel && toggleAllLabel.length > 0;

  return (
    <div className={className}>
      <Options>
        {searchMethod && (
          <SearchInputContainer>
            <SearchBar
              placeholder={searchBarPlaceholder}
              onChange={setSearchTerm}
              value={searchTerm}
            />
          </SearchInputContainer>
        )}
        {shouldDisplayToggleAll &&
          (OptionComponent !== null ? (
            <OptionComponent
              key="toggle-all"
              label={toggleAllLabel}
              onChange={toggleAll}
              value=""
              values={values}
              isChecked={values.length === options.length}
            />
          ) : (
            <CheckboxOption
              key="toggle-all"
              label={toggleAllLabel}
              onChange={toggleAll}
              value=""
              values={values}
              isChecked={values.length === options.length}
            />
          ))}
        {noResultMessage}
        {elements}
      </Options>
    </div>
  );
};

const { array, bool, func, object, oneOfType, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
OptionsList.propTypes = {
  /**
   * is checkboxes or radios ?
   */
  allowMultiple: bool,

  /**
   * ClassName needed by styled components
   */
  className: string,

  /**
   * Component to display when no result is found
   */
  NoResult: oneOfType([func, string]),

  /**
   * Array of options with value and label
   */
  options: array.isRequired,

  /**
   *
   */
  onChange: func,

  /**
   *
   */
  OptionComponent: object,

  /**
   * SearchBar input placeholder
   */
  searchBarPlaceholder: string,

  /**
   * Method used to search in the options
   */
  searchMethod: func,

  /**
   * Select all string
   */
  toggleAllLabel: string,
  /**
   * Selected values
   */
  values: array.isRequired,
};

/**
 * Default props
 */
OptionsList.defaultProps = {
  className: '',
  NoResult: null,
  onChange: () => {},
  allowMultiple: false,
  searchBarPlaceholder: '',
  searchMethod: null,
  toggleAllLabel: 'Select all',
  OptionComponent: null,
};

OptionsList.CheckboxOption = CheckboxOption;
OptionsList.RadioOption = RadioOption;
OptionsList.SimpleOption = SimpleOption;

export default styled(OptionsList)`
  background-color: #fff;
`;
