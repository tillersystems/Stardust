/* eslint-disable react/require-default-props */

import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Popover from '../Popover';
import SearchBar from './SearchBar';
import { Header, HeaderContent, Menu, MenuItem, SearchInputContainer } from './elements';

/**
 * A Dropdown displays content through its children prop that must be components wrapping text.
 * The trigger is a button displaying text provided by the prop `title`
 *
 * See README.md and storybook for more documentation
 *
 * @return {jsx}
 */

class Dropdown extends PureComponent {
  /** Internal state. */
  state = {
    displayMenu: false,
    searchKeyword: '',
  };

  /** preserve the initial state in a new object. */
  baseState = this.state;

  /**
   * Handle Search
   */
  handleSearch = searchTerm => {
    this.setState({ ...this.state, searchKeyword: searchTerm });
  };

  /**
   * Returns true if requested prop exists
   *
   * @param {string} prop - requested property name
   *
   * @return {boolean}
   */
  isControlled = prop => {
    const props = this.props;

    return props.hasOwnProperty(prop);
  };

  /**
   * Returns the value a property from props if prop exists and from state otherwise
   *
   * @param {string} key - requested property name
   *
   * @return {*} value of the property
   */
  getControllableValue = key => {
    const props = this.props;
    const state = this.state;

    return this.isControlled(key) ? props[key] : state[key];
  };

  /**
   * Closes the select on outside click and triggers callback of parent
   *
   */
  onClickOutside = event => {
    const { onToggle } = this.props;

    if (this.isControlled('displayMenu')) {
      onToggle && onToggle(event);
    } else {
      this.setState(
        {
          displayMenu: false,
        },
        () => {
          onToggle && onToggle(false);
        },
      );
    }
  };

  /**
   * Reset Search Input
   * Clear search input value
   *
   */
  resetSearchInput = () => {
    this.setState(this.baseState);
  };

  /**
   * Toggle Menu display and clear search input.
   * Triggers callback if parent provided it
   *
   */
  toggleMenu = () => {
    const displayMenu = this.getControllableValue('displayMenu');
    const { onToggle } = this.props;

    if (this.isControlled('displayMenu')) {
      onToggle && onToggle(event);
    } else {
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
    }
  };

  /**
   * Triggered when ref to the trigger has been set.
   * Allows us to retrieve the width of the trigger to set it to the content wrapper
   *
   */
  triggerRef = ref => {
    const contentWidth = ref && ref.offsetWidth;

    this.setState({ contentWidth: `${contentWidth}px` });
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const {
      children,
      className,
      contentRef,
      headerStyle,
      itemCss,
      modifiers,
      noResultLabel,
      searchable,
      searchBarPlaceholder,
      title,
      usePortal,
    } = this.props;
    const { contentWidth, displayMenu: displayMenuState, searchKeyword } = this.state;
    const { displayMenu: displayMenuProp } = this.props;
    const displayMenu = this.isControlled('displayMenu') ? displayMenuProp : displayMenuState;

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
        <Popover
          content={
            <Menu>
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
                      <MenuItem
                        key={child.key}
                        role="menuitem"
                        css={itemCss}
                        searchable={searchable}
                      >
                        {child}
                      </MenuItem>
                    ))
                  : noResultLabel && (
                      <MenuItem role="menuitem" css={itemCss}>
                        {noResultLabel}
                      </MenuItem>
                    ))}
              {!searchable &&
                Children.map(children, child => (
                  <MenuItem key={child} role="menuitem" css={itemCss}>
                    {child}
                  </MenuItem>
                ))}
            </Menu>
          }
          contentRef={contentRef}
          contentWrapperStyle={{
            marginBottom: '0.4rem',
            marginTop: '0.4rem',
          }}
          isOpen={displayMenu}
          modifiers={modifiers}
          onClickOutside={this.onClickOutside}
          triggerRef={this.triggerRef}
          usePortal={usePortal}
          width={contentWidth}
        >
          <Header
            onClick={this.toggleMenu}
            aria-haspopup="true"
            aria-expanded={displayMenu}
            data-testid="dropdown-button"
            style={headerStyle}
          >
            <HeaderContent>{title}</HeaderContent>
          </Header>
        </Popover>
      </div>
    );
  }
}

const { array, bool, func, object, node, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
Dropdown.propTypes = {
  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node.isRequired,

  /**
   * ClassName needed by styled components
   */
  className: string,

  /**
   * Callback ref of content element
   */
  contentRef: func,

  /**
   * If the dropdown is open or not. If it is in a controlled state, this prop should be passed
   * otherwise it will rely on internal state
   */
  // eslint-disable-next-line react/no-unused-prop-types
  displayMenu: bool,

  /**
   * Style for header component
   */
  headerStyle: object,

  /**
   * CSS height of the component
   */
  // eslint-disable-next-line react/no-unused-prop-types
  height: string,

  /**
   * CSS provided to each item of the dropdown. Must use `css` method from styled-components
   */
  itemCss: array,

  /**
   * Customize popper behaviour. Plugins to alter the behaviour of the popper. See https://popper.js.org/popper-documentation.html
   */
  modifiers: object,

  /**
   * Label to display when no result is found
   */
  noResultLabel: string,

  /**
   * Callback called when Dropdown is toggled
   */
  onToggle: func,

  /**
   * Whether the dropdown is searchable
   */
  searchable: bool,

  /**
   * SearchBar input placeholder
   */
  searchBarPlaceholder: string,

  /**
   * Dropdown title
   */
  title: node.isRequired,

  /**
   * Display the content on a portal
   */
  usePortal: bool,
};

/**
 * Default props
 */
Dropdown.defaultProps = {
  className: '',
  headerStyle: null,
  height: '3.8rem',
  itemCss: null,
  modifiers: null,
  noResultLabel: null,
  onToggle: () => {},
  searchable: false,
  searchBarPlaceholder: '',
  usePortal: false,
};

export default styled(Dropdown)`
  position: relative;
  user-select: none;
  height: ${({ height }) => height || '3.8rem'};
`;
