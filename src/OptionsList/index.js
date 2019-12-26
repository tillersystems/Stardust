/* eslint-disable react/require-default-props */

import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Container, List, Option, NoResultDefaultComponent } from './elements';
import SearchBar from './SearchBar';

import { CheckboxOption, RadioOption, SimpleOption } from './Options';

const OptionsList = ({
  allowMultiple,
  className,
  NoResult,
  onChange,
  OptionComponent,
  options,
  searchPlaceholder,
  searchMethod,
  toggleAllLabel,
  values,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // The option component to display
  const ListItem = OptionComponent || (allowMultiple ? CheckboxOption : RadioOption);

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

  const items = useMemo(
    () => (searchMethod ? searchMethod({ options, term: searchTerm }) : options),
    [options, searchMethod, searchTerm],
  );

  /**
   * Display a message if no items
   */
  const noResultMessage = useMemo(() => {
    if (items.length > 0) {
      return null;
    } else if (typeof NoResult === 'function') {
      // Allow passing a component as NoResult
      return <NoResult term={searchTerm} setTerm={setSearchTerm} options={options} />;
    } else {
      return <NoResultDefaultComponent>{NoResult}</NoResultDefaultComponent>;
    }
  }, [searchTerm, items.length, NoResult, options]);

  const shouldDisplayToggleAll =
    searchTerm.length === 0 && allowMultiple && toggleAllLabel && toggleAllLabel.length > 0;

  return (
    <Container className={className}>
      {searchMethod && (
        <SearchBar placeholder={searchPlaceholder} onChange={setSearchTerm} value={searchTerm} />
      )}
      <List>
        {shouldDisplayToggleAll && (
          <ListItem
            key="toggle-all"
            label={toggleAllLabel}
            onChange={toggleAll}
            value=""
            values={values}
            isChecked={values.length === options.length}
          />
        )}
        {items.map(({ value, label, disabled, value: key }) => (
          <ListItem
            key={key}
            disabled={disabled}
            label={label}
            onChange={handleChange}
            value={value}
            values={values}
          />
        ))}
      </List>
      {noResultMessage}
    </Container>
  );
};

const { array, bool, func, node, oneOfType, string } = PropTypes;

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
  NoResult: oneOfType([func, node, string]),

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
  OptionComponent: oneOfType([func, node]),

  /**
   * SearchBar input placeholder
   */
  searchPlaceholder: string,

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
  searchPlaceholder: '',
  searchMethod: null,
  toggleAllLabel: null,
  OptionComponent: null,
};

OptionsList.Option = Option;
OptionsList.CheckboxOption = CheckboxOption;
OptionsList.RadioOption = RadioOption;
OptionsList.SimpleOption = SimpleOption;

export default OptionsList;
