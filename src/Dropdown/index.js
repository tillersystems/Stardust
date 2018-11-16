import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import SearchBar from './SearchBar';
import { Header, Menu, MenuItem, SearchInputContainer } from './elements';

const { bool, func, node, string } = PropTypes;

/**
 * Dropdown
 *
 * This component is in charge of displaying
 * a dropdown
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // Add a text aside in the select next the selected value.
 * @param {node} noResultLabel // Label to display when no result found.
 * @param {bool} searchable // Whether the dropdown is searchable.
 * @param {string} searchBarPlacholder // SearchBar input placholder.
 * @param {node} title // Dropdown title.
 *
 * @return {jsx}
 */

class Dropdown extends PureComponent {
  /** Prop types. */
  static propTypes = {
    children: node.isRequired,
    className: string,
    noResultLabel: string,
    onToggle: func,
    searchable: bool,
    searchBarPlacholder: string,
    title: node.isRequired,
  };

  /** Default props. */
  static defaultProps = {
    className: '',
    noResultLabel: null,
    onToggle: () => {},
    searchable: false,
    searchBarPlacholder: '',
  };

  /** Internal state. */
  state = {
    displayMenu: false,
    searchKeyword: '',
  };

  /** preserve the initial state in a new object. */
  baseState = this.state;

  /**
   * Toogle Menu
   */
  toggleMenu = () => {
    const { displayMenu } = this.state;
    const { onToggle } = this.props;

    this.setState(
      prevState => ({
        displayMenu: !prevState.displayMenu,
      }),
      () => {
        // Clear input value if menu is open
        if (displayMenu) {
          this.resetSearchInput();
        }
        onToggle && onToggle(!displayMenu);
      },
    );
  };

  /**
   * Handle Click Outside
   */
  handleClickOutside = () => {
    this.setState({ displayMenu: false });

    // Clear input value
    this.resetSearchInput();
  };

  /**
   * Handle Search
   */
  handleSearch = searchTerm => {
    this.setState({ ...this.state, searchKeyword: searchTerm });
  };

  /**
   * Reset Search Input
   * Clear input value
   */
  resetSearchInput() {
    this.setState(this.baseState);
  }

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const {
      children,
      className,
      noResultLabel,
      title,
      searchable,
      searchBarPlacholder,
    } = this.props;
    const { displayMenu, searchKeyword } = this.state;

    // Filter items based on search key word
    // TODO: when need to refactor this later, children may have some children
    // we need to filter recursively. - @Thomas -
    const FiltredItem = Children.toArray(children).filter(({ props: { children } }) =>
      children.toLowerCase().includes(searchKeyword.toLowerCase()),
    );

    return (
      <div className={className}>
        <Header
          onClick={this.toggleMenu}
          aria-haspopup="true"
          aria-expanded={displayMenu}
          data-test="dropdown-header"
        >
          {title}
        </Header>
        <PoseGroup>
          {displayMenu && (
            <MenuAnimation key="Menu" role="menu">
              {searchable && (
                <SearchInputContainer>
                  <SearchBar
                    placeHolder={searchBarPlacholder}
                    onChange={this.handleSearch}
                    value={searchKeyword}
                  />
                </SearchInputContainer>
              )}

              {searchable &&
                (FiltredItem.length !== 0
                  ? FiltredItem.map(child => (
                      <MenuItem key={child.key} searchable={searchable} role="menuitem">
                        {child}
                      </MenuItem>
                    ))
                  : noResultLabel && <MenuItem role="menuitem">{noResultLabel}</MenuItem>)}

              {!searchable &&
                Children.map(children, child => (
                  <MenuItem key={child} role="menuitem">
                    {child}
                  </MenuItem>
                ))}
            </MenuAnimation>
          )}
        </PoseGroup>
      </div>
    );
  }
}

/**
 * Animation
 */
const MenuAnimation = posed(Menu)({
  enter: {
    opacity: 1,
    scaleY: 1,
    transition: {
      scaleY: { ease: 'anticipate', duration: 150 },
      default: { duration: 150 },
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: { duration: 150 },
  },
});

export default styled(onClickOutside(Dropdown))`
  position: relative
  user-select: none
`;
