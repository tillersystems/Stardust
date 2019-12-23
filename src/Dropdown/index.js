/* eslint-disable react/require-default-props */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Popover from '../Popover';
import { Header, HeaderContent } from './elements';
import { animationVariants } from './animation';
import { offset } from './utils';
import OptionsList from '../OptionsList';

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
    portalPosition: { left: '0px', top: '0px' },
  };

  /** preserve the initial state in a new object. */
  baseState = this.state;

  constructor(props) {
    super(props);
    this.dropdown = React.createRef();
  }

  componentDidMount() {
    // listen for resize and mousewheel to handle portal position
    setTimeout(this.updatePosition.bind(this), 0);
    window.addEventListener('resize', this.updatePosition.bind(this));
    document.body.addEventListener('mousewheel', this.updatePosition.bind(this));
  }

  componentWillUnmount() {
    // will remove resize and mousewheel event on dismount
    window.removeEventListener('resize', this.updatePosition.bind(this));
    document.body.removeEventListener('mousewheel', this.updatePosition.bind(this));
  }

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
    const { portalPosition } = this.state;
    this.setState({ ...this.baseState, portalPosition });
  };

  /**
   * Toggle Menu display and clear search input.
   * Triggers callback if parent provided it
   *
   */
  toggleMenu = () => {
    const displayMenu = this.getControllableValue('displayMenu');
    const { onToggle } = this.props;

    this.updatePosition();

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
   * Save current dropdown position in state for portal
   */
  updatePosition() {
    if (this.dropdown.current) {
      this.setState({ portalPosition: offset(this.dropdown.current) });
    }
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
      contentRef,
      headerStyle,
      modifiers,
      title,
      usePortal,
      ...listProps
    } = this.props;
    const { contentWidth, displayMenu: displayMenuState, portalPosition } = this.state;
    const { displayMenu: displayMenuProp } = this.props;
    const displayMenu = this.isControlled('displayMenu') ? displayMenuProp : displayMenuState;

    return (
      <div ref={this.dropdown} className={className} data-testid="dropdown">
        <Popover
<<<<<<< HEAD
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
=======
          animationVariants={animationVariants}
          content={children || <OptionsList {...listProps} />}
>>>>>>> f4bae39... feat(Dropdown): can render an OptionsList instead of children
          contentRef={contentRef}
          contentWrapperStyle={{ marginTop: '4rem' }}
          isOpen={displayMenu}
          modifiers={modifiers}
          onClickOutside={this.onClickOutside}
          portalPosition={portalPosition}
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

const { bool, func, object, node, string } = PropTypes;

/**
 *
 * PropTypes validation
 */
Dropdown.propTypes = {
  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node,

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
   * OptionsList props, if innerComponent is null, we will render the children
   */
  innerComponent: object,

  /**
   * Customize popper behaviour. Plugins to alter the behaviour of the popper. See https://popper.js.org/popper-documentation.html
   */
  modifiers: object,

  /**
   * Callback called when Dropdown is toggled
   */
  onToggle: func,

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
  children: null,
  className: '',
  headerStyle: null,
  height: '3.8rem',
  innerComponent: null,
  modifiers: null,
  onToggle: () => {},
  usePortal: false,
};

export default styled(Dropdown)`
  position: relative;
  user-select: none;
  height: ${({ height }) => height || '3.8rem'};
`;
