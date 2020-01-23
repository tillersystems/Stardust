/* eslint-disable react/require-default-props */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Container, List, Option, NoResultDefaultComponent } from './elements';
import SearchBar from './SearchBar';

import { CheckboxOption, RadioOption, SimpleOption } from './Options';

class OptionsList extends PureComponent {
  state = { searchTerm: '', searchItems: [] };

  onSearch = term => {
    const { searchMethod, options } = this.props;

    if (!searchMethod) return;

    const items = searchMethod({ options, term });

    this.setState({ searchTerm: term, searchItems: items });
  };

  toggleAll = () => {
    const { values, options, onChange } = this.props;

    if (options.length === values.length) {
      onChange([]);
    } else {
      onChange(options.map(option => option.value));
    }
  };

  handleChange = value => {
    const { values, allowMultiple, onChange } = this.props;

    let nextValues = values;
    if (!allowMultiple) {
      nextValues = [value];
    } else if (values.includes(value)) {
      nextValues = values.filter(v => v !== value);
    } else {
      nextValues = [...values, value];
    }

    onChange(nextValues);
  };

  renderNoResult() {
    const { NoResult, options } = this.props;
    const { searchTerm, searchItems } = this.state;

    if (!searchTerm || searchItems.length > 0) {
      return null;
    } else if (typeof NoResult === 'function') {
      // Allow passing a component as NoResult
      return <NoResult term={searchTerm} setTerm={this.onSearch} options={options} />;
    } else {
      return <NoResultDefaultComponent>{NoResult}</NoResultDefaultComponent>;
    }
  }

  render() {
    const {
      allowMultiple,
      className,
      OptionComponent,
      options,
      searchPlaceholder,
      searchMethod,
      toggleAllLabel,
      values,
    } = this.props;
    const { searchTerm, searchItems } = this.state;

    const items = searchTerm ? searchItems : options;

    const ListItem = OptionComponent || (allowMultiple ? CheckboxOption : RadioOption);

    const shouldDisplayToggleAll =
      searchTerm.length === 0 && allowMultiple && toggleAllLabel && toggleAllLabel.length > 0;

    const selectedOptions = new Set(values);

    return (
      <Container className={className}>
        {searchMethod && (
          <SearchBar placeholder={searchPlaceholder} onChange={this.onSearch} value={searchTerm} />
        )}
        <List>
          {shouldDisplayToggleAll && (
            <ListItem
              key="toggle-all"
              label={toggleAllLabel}
              onChange={this.toggleAll}
              value=""
              values={values}
              isSelected={values.length === options.length}
            />
          )}
          {items.map(({ value, label, disabled }) => (
            <ListItem
              key={value}
              value={value}
              disabled={disabled}
              label={label}
              onChange={this.handleChange}
              isSelected={selectedOptions.has(value)}
            />
          ))}
        </List>
        {this.renderNoResult()}
      </Container>
    );
  }
}

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
  OptionComponent: PropTypes.elementType,

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
