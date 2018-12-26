import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';

import { Header, Menu, MenuItem } from './elements';
import Option from './Option';

const { bool, func, node, string } = PropTypes;

/**
 * Select
 *
 * This component is in charge of displaying
 * a select
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className /// className needed by styled components.
 * @param {function} onSelected // Function fired when an element of the <Select /> is selected.
 * @param {function} onToggle // Function fired when the <Select /> is toggled.
 * @param {string} title // Title of the <Select /> component.
 *
 * @return {jsx}
 */

class Select extends PureComponent {
  static Option = Option;

  /** Prop types. */
  static propTypes = {
    children: node,
    className: string,
    disabled: bool,
    onSelected: func,
    onToggle: func,
    title: string.isRequired,
    resetTitle: bool,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    className: '',
    disabled: false,
    onSelected: () => {},
    onToggle: () => {},
    resetTitle: false,
  };

  /**
   * getDerivedStateFromProps
   *
   * @param {object} props
   * @param {object} state
   *
   * @return {object}
   */
  static getDerivedStateFromProps(props, state) {
    if (props.resetTitle !== state.resetTitle) {
      return {
        headerTitle: props.title,
      };
    }

    return null;
  }

  /** Internal state. */
  state = {
    displayMenu: false,
    headerTitle: this.props.title, // eslint-disable-line react/destructuring-assignment
    resetTitle: this.props.resetTitle, // eslint-disable-line react/destructuring-assignment
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
        onToggle && onToggle(!displayMenu);
      },
    );
  };

  /**
   * Handle Selected
   *
   * @param {object} currentTarget
   *
   */
  handleSelected({ currentTarget }) {
    const { onSelected } = this.props;
    const headerTitle = currentTarget.textContent;

    this.setState(
      prevState => ({
        ...prevState,
        headerTitle,
      }),
      () => {
        onSelected && onSelected(headerTitle);
        this.toggleMenu();
      },
    );
  }

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { children, className, disabled } = this.props;
    const { displayMenu, headerTitle } = this.state;

    return (
      <div className={className}>
        <Header
          onClick={!disabled ? this.toggleMenu : null}
          disabled={disabled}
          aria-haspopup="true"
          aria-expanded={displayMenu}
        >
          {headerTitle}
        </Header>
        <PoseGroup>
          {displayMenu && (
            <MenuAnimation key="Menu" role="menu">
              {Children.map(children, child => (
                <MenuItem key={child} role="menuitem" onClick={event => this.handleSelected(event)}>
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

export default styled(Select)`
  position: relative;
  user-select: none;

  /* Disabled */
  ${({ disabled }) =>
    disabled &&
    css`
      ${Header} {
        cursor: not-allowed;
        opacity: 0.4;
      }
    `}
`;
