import React, { Children, PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Portal } from 'react-portal';

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
 * @param {function} onChange // Function fired when an element of the <Select /> is selected.
 * @param {function} onToggle // Function fired when the <Select /> is toggled.
 * @param {string} placeholder // placeholder of the <Select /> component.
 * @param {boolean} resetValue // Title of the <Select /> component.
 *
 * @return {jsx}
 */

class Select extends PureComponent {
  static Option = Option;

  /** Create ref for the header and the portal */
  headerRef = createRef();
  portalRef = createRef();

  /** Prop types. */
  static propTypes = {
    children: node,
    className: string,
    disabled: bool,
    onChange: func,
    onToggle: func,
    placeholder: string,
    resetValue: bool,
    value: string,
    // https://github.com/yannickcr/eslint-plugin-react/issues/1520
    // eslint-disable-next-line react/no-unused-prop-types
    width: string,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    className: '',
    disabled: false,
    onChange: () => {},
    onToggle: () => {},
    resetValue: false,
    placeholder: null,
    value: null,
    width: '100%',
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
    if (props.resetValue !== state.resetValue) {
      return {
        resetValue: props.resetValue,
        ...(props.resetValue ? { value: null } : {}),
      };
    }

    return null;
  }

  /** Internal state. */
  state = {
    displayMenu: false,
    placeholder: this.props.placeholder, // eslint-disable-line react/destructuring-assignment
    value: null,
    resetValue: this.props.resetValue, // eslint-disable-line react/destructuring-assignment
    menuPosition: {
      width: '100%',
      top: 0,
    },
  };

  /**
   * Component lifecycle method
   * Once the component is mounted, checks if a value is provided
   * to the component to initialize the displayed value on the Select.
   * Otherwise, if a placeholder is provided, no value is initialized to display
   * the placeholder at the render.
   */
  componentDidMount() {
    const { children, value, placeholder } = this.props;

    if (value) {
      const isMatchingOption = children.filter(option => option.props.value === value).length === 1;

      if (isMatchingOption) {
        this.setState({ value });
      } else {
        this.initializeValue();
      }
    } else if (!placeholder) {
      this.initializeValue();
    }

    document.addEventListener('mousedown', this.handleClick);
  }

  /**
   * Handles value update from parent.
   *
   * @param {Object} prevProps - The previous component's props.
   */
  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({ value });
    }
  }

  /**
   * Remove touch event listener
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  /**
   * Initialize in the state the value displayed on the select
   * Takes the first option available in the children props
   *
   */
  initializeValue = () => {
    const {
      children: [
        {
          props: { value: firstValue },
        },
      ],
    } = this.props;

    this.setState({ value: firstValue });
  };

  /**
   * Callback triggered when menu display needs to be updated
   *
   */
  toggleMenu = event => {
    event.preventDefault();
    const { onToggle } = this.props;

    // click is inside the menu, we let handleSelected take over the handling
    if (this.portalRef.current.contains(event.target)) {
      return;
    }

    // click is inside the header
    if (this.headerRef.current.contains(event.target)) {
      const { displayMenu } = this.state;

      this.setState(
        prevState => ({
          displayMenu: !prevState.displayMenu,
        }),
        () => {
          onToggle && onToggle(!displayMenu);
          this.setMenuPosition();
        },
      );
      return;
    }

    // click is outside this component, we close the menu
    this.setState(
      () => ({
        displayMenu: false,
      }),
      () => {
        onToggle && onToggle(false);
      },
    );
  };

  /**
   * Handle click on the
   * Trigger callback only if component is not disabled
   *
   */
  handleClick = event => {
    const { disabled } = this.props;

    if (!disabled) {
      this.toggleMenu(event);
    }
  };

  /**
   * Compute position of portal menu
   *
   */
  setMenuPosition = () => {
    const { width, height } = this.headerRef.current.getBoundingClientRect();

    const marginTop = 4;

    const menuPosition = {
      width,
      top: height + marginTop,
    };

    this.setState({ menuPosition });
  };

  /**
   * Handle selected item on the menu
   *
   * @param {string} value
   *
   */
  handleSelected(event, value) {
    event.persist();
    const { onChange, onToggle } = this.props;

    this.setState(
      {
        displayMenu: false,
        value,
      },
      () => {
        onChange && onChange(value);
        onToggle && onToggle(false);
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
    const { displayMenu, menuPosition, placeholder, value } = this.state;

    return (
      <div className={className}>
        <Header
          disabled={disabled}
          aria-haspopup="true"
          aria-expanded={displayMenu}
          ref={this.headerRef}
        >
          {/* if placeholder is defined display it, otherwise use the value of the first option */}
          {placeholder && !value
            ? placeholder
            : Children.map(children, child => (child.props.value === value ? child : null))}
        </Header>
        <div ref={this.portalRef} />
        <Portal node={this.portalRef.current}>
          <PoseGroup flipMove={false}>
            {displayMenu && (
              <MenuAnimation key="Menu" role="menu" position={menuPosition}>
                {Children.map(children, child => (
                  <MenuItem
                    key={child}
                    role="menuitem"
                    onClick={event => this.handleSelected(event, child.props.value)}
                  >
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

export default styled(Select)`
  position: relative;
  user-select: none;
  width: ${({ width }) => (/^\d+(rem|px)$/.test(width) ? width : 'auto')};
  height: 4rem;

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
