import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextInput from '../Input/TextInput';

const { func, string } = PropTypes;

/**
 * SearchBar
 *
 * This component is in charge of displaying
 * a search bar
 *
 * @param {string} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // Add a text aside in the select next the selected value.
 * @param {function} onChange // Callback function called when text input change.
 * @param {string} placeHolder // Input placeHolder.
 * @param {string} value // Input value.
 *
 * @return {jsx}
 */

class SearchBar extends PureComponent {
  /** Prop types. */
  static propTypes = {
    className: string,
    onChange: func.isRequired,
    placeHolder: string,
    value: string,
  };

  /** Default props. */
  static defaultProps = {
    className: '',
    placeHolder: '',
    value: '',
  };

  /**
   * handleChange
   */
  handleChange = searchTerm => {
    const { onChange } = this.props;

    onChange && onChange(searchTerm);
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { className, placeHolder, value } = this.props;

    return (
      <div className={className}>
        <TextInput
          ghost
          data-test="search-input"
          value={value}
          onChange={this.handleChange}
          placeHolder={placeHolder}
          fluid
          search
        />
      </div>
    );
  }
}

export default styled(SearchBar)`
  width: 100%;
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
`;
