import React, { Children, PureComponent, createRef } from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import SearchBar from './SearchBar';
import { Header, Menu, MenuItem, SearchInputContainer } from './elements';

const { array, bool, func, node, string } = PropTypes;

/**
 * Dropdown
 *
 * This component is in charge of displaying
 * a dropdown
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // Add a text aside in the select next the selected value.
 * @param {node} noResultLabel // Label to display when no result found.
 * @param {function} onToggle // Callback called when Dropdown is toggled.
 * @param {bool} searchable // Whether the dropdown is searchable.
 * @param {string} searchBarPlaceholder // SearchBar input placeholder.
 * @param {node} title // Dropdown title.
 *
 * @return {jsx}
 */

class Dropdown extends PureComponent {
  /** Prop types. */
  static propTypes = {
    children: node.isRequired,
    className: string,
    itemCss: array,
    noResultLabel: string,
    onToggle: func,
    searchable: bool,
    searchBarPlaceholder: string,
    title: node.isRequired,
  };

  /** Default props. */
  static defaultProps = {
    className: '',
    itemCss: null,
    noResultLabel: null,
    onToggle: () => {},
    searchable: false,
    searchBarPlaceholder: '',
  };

  /** Internal state. */
  state = {
    displayMenu: false,
    menuPosition: {
      width: 100,
      top: 0,
      left: 0,
    },
    searchKeyword: '',
  };

  /** Create a ref for the dropdown header. */
  dropdownHeaderRef = createRef();

  /** preserve the initial state in a new object. */
  baseState = this.state;

  /**
   * Handle Click
   */
  handleClick = () => {
    this.toggleMenu();
    this.setMenuPosition();
  };

  /**
   * Toogle Menu
   */
  toggleMenu = () => {
    const { displayMenu } = this.state;
    const { onToggle } = this.props;

    this.setState(
      prevState => ({
        ...prevState,
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
   * Get header position and fill state with menu positions values
   */
  setMenuPosition = () => {
    const { width, height, top, left } = this.dropdownHeaderRef.current.getBoundingClientRect();

    const marginTop = 4;
    const outerHeight = height + marginTop;
    const topWithScroll = top + pageYOffset;
    const menuPositionTop = topWithScroll + outerHeight;

    const menuPositionleft = left + pageXOffset;

    const menuPosition = {
      width,
      top: menuPositionTop,
      left: menuPositionleft,
    };

    this.setState({ menuPosition });
  };

  /**
   * Handle Click Outside
   */
  handleClickOutside = () => {
    this.toggleMenu(false);

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
      itemCss,
      noResultLabel,
      searchable,
      searchBarPlaceholder,
      title,
    } = this.props;
    const { displayMenu, searchKeyword, menuPosition } = this.state;

    // Filter items based on search key word
    // TODO: when need to refactor this later, children may have some children
    // we need to filter recursively. - @Thomas -
    const FilteredItems = searchable
      ? Children.toArray(children).filter(({ props: { children } }) =>
          children.toLowerCase().includes(searchKeyword.toLowerCase()),
        )
      : [];

    return (
      <div className={className} data-testid="dropdown">
        <Header
          onClick={this.handleClick}
          aria-haspopup="true"
          aria-expanded={displayMenu}
          data-testid="dropdown-button"
          ref={this.dropdownHeaderRef}
        >
          {title}
        </Header>
        <Portal>
          <PoseGroup flipMove={false}>
            {displayMenu && (
              <MenuAnimation
                key="Menu"
                role="menu"
                position={menuPosition}
                className="ignore-react-onclickoutside"
              >
                {searchable && (
                  <SearchInputContainer>
                    <SearchBar
                      placeholder={searchBarPlaceholder}
                      onChange={this.handleSearch}
                      value={searchKeyword}
                    />
                  </SearchInputContainer>
                )}

                {searchable &&
                  (FilteredItems.length !== 0
                    ? FilteredItems.map(child => (
                        <MenuItem key={child.key} role="menuitem" css={itemCss}>
                          {child}
                        </MenuItem>
                      ))
                    : noResultLabel && <MenuItem role="menuitem">{noResultLabel}</MenuItem>)}
                {!searchable &&
                  Children.map(children, child => (
                    <MenuItem key={child} role="menuitem" css={itemCss}>
                      {child}
                    </MenuItem>
                  ))}
              </MenuAnimation>
            )}
          </PoseGroup>
        </Portal>
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
  position: relative;
  user-select: none;
  height: 100%;
`;
