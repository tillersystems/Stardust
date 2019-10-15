/* eslint-disable react/require-default-props */

import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Popover } from '..';
import { Header, HeaderContent, Menu, MenuItem } from './elements';
import Option from './Option';
import { animationVariants } from './animation';

/**
 * Select component displays a button as header holding one value at a time amongst
 * a list of values (children)
 *
 * See README.md and its stories from Storybook for documentation and examples
 *
 * @return {jsx}
 */
class Select extends PureComponent {
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
  };

  /**
   * Component lifecycle method
   *
   * Once the component is mounted, checks if the component is controlled i.e. a value is provided
   * to the component to initialize the displayed value on the Select
   * Otherwise, if a placeholder is provided, no value is initialized to display
   * the placeholder at the render.
   */
  componentDidMount() {
    const { children } = this.props;

    if (this.isControlled('value')) {
      const value = this.getControllableValue('value');
      const isMatchingOption = children.filter(option => option.props.value === value).length === 1;

      if (isMatchingOption) {
        this.setState({ value });
      } else {
        this.initializeValue();
      }
    } else if (!this.isControlled('placeholder')) {
      this.initializeValue();
    }
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
   * Uncontrolled case
   *
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
   * Callback triggered on item selection
   * Triggers callback if provided and updates state if is uncontrolled
   *
   * @param {Event} event
   * @param {string} value
   *
   */
  handleSelected = (event, item) => {
    event.persist();
    const prevValue = this.getControllableValue('value');

    if (this.isControlled('value')) {
      this.onSelectActions(item, prevValue, event);
    } else {
      this.setState({ value: item }, () => {
        this.onSelectActions(item, prevValue, event);
      });
    }
  };

  /**
   * Closes the select on outside click and triggers callback of parent
   *
   */
  onClickOutside = () => {
    const { onToggle } = this.props;

    this.setState(
      {
        displayMenu: false,
      },
      () => {
        onToggle && onToggle(false);
      },
    );
  };

  /**
   * Triggers callback (if provided) on value change by click
   *
   * @param {Event} event
   * @param {string} value
   *
   */
  onSelectActions = (value, prevValue, event) => {
    if (prevValue !== value) {
      const { onChange } = this.props;
      onChange && onChange(value);
    }

    this.toggleMenu(event);
  };

  /**
   * Toggles the menu by updating the boolean to its opposite value
   *
   */
  toggleMenu = event => {
    event.preventDefault();
    const { displayMenu } = this.state;
    const { onToggle } = this.props;

    this.setState(
      prevState => ({
        displayMenu: !prevState.displayMenu,
      }),
      () => {
        onToggle && onToggle(!displayMenu);
      },
    );
  };

  triggerRef = ref => {
    const contentWidth = ref && ref.children[0].offsetWidth;

    this.setState({ contentWidth: `${contentWidth}px` });
  };

  static Option = Option;

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
      disabled,
      modifiers,
      triggerWrapperCss,
      usePortal,
    } = this.props;
    const { contentWidth, displayMenu } = this.state;
    const hasPlaceholder = this.isControlled('placeholder');
    const value = this.getControllableValue('value');

    return (
      <div className={className}>
        <Popover
          animationVariants={animationVariants}
          content={
            <Menu>
              {Children.map(children, child => (
                <MenuItem
                  key={child}
                  role="menuitem"
                  onClick={event => this.handleSelected(event, child.props.value)}
                  isSelected={child.props.value === value}
                >
                  {child}
                </MenuItem>
              ))}
            </Menu>
          }
          contentRef={contentRef}
          isOpen={displayMenu}
          modifiers={modifiers}
          onClickOutside={this.onClickOutside}
          triggerRef={this.triggerRef}
          triggerWrapperCss={triggerWrapperCss}
          contentWrapperStyle={{ marginTop: '4rem' }}
          usePortal={usePortal}
          width={contentWidth}
        >
          <Header
            onClick={!disabled ? this.toggleMenu : null}
            disabled={disabled}
            aria-haspopup="true"
            aria-expanded={displayMenu}
          >
            <HeaderContent>
              {/* if placeholder is defined display it, otherwise use the value of the first option */}
              {hasPlaceholder && !value
                ? this.getControllableValue('placeholder')
                : Children.map(children, child => (child.props.value === value ? child : null))}
            </HeaderContent>
          </Header>
        </Popover>
      </div>
    );
  }
}

/**
 * PropTypes Validation
 */
const { array, bool, func, node, object, string } = PropTypes;
Select.propTypes = {
  /**
   * Must be multiple children each containing a value prop
   */
  children: node,

  /**
   * Prop needed by styled components
   */
  className: string,

  /**
   * Callback ref of content element
   */
  contentRef: func,

  /**
   * If the select should be disabled or not
   */
  disabled: bool,

  /**
   * CSS height of the component
   */
  // https://github.com/yannickcr/eslint-plugin-react/issues/1520
  // eslint-disable-next-line react/no-unused-prop-types
  height: string,

  /**
   * Customize popper behaviour. Plugins to alter the behaviour of the popper. See https://popper.js.org/popper-documentation.html
   */
  modifiers: object,

  /**
   * Callback fired when an element of the <Select /> is selected
   */
  onChange: func,

  /**
   * Callback fired when the <Select /> is toggled (becomes closed or open)
   */
  onToggle: func,

  /**
   * Placeholder of the <Select /> component in the header
   */
  placeholder: string,

  /**
   * If select value should be reset to null
   */
  resetValue: bool,

  /**
   * css provided to the trigger wrapper. Must use `css` method from styled-components.
   */
  triggerWrapperCss: array,

  /**
   * Displays the content on a portal
   */
  usePortal: bool,

  /**
   * Selected value identifier
   */
  value: string,

  /**
   * CSS width of the component
   */
  // https://github.com/yannickcr/eslint-plugin-react/issues/1520
  // eslint-disable-next-line react/no-unused-prop-types
  width: string,
};

/**
 * Default props
 */
Select.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  height: '3.8rem',
  resetValue: false,
  triggerWrapperCss: null,
  usePortal: false,
  width: '100%',
};

export default styled(Select)`
  position: relative;
  user-select: none;
  height: ${({ height }) => height || '3.8rem'};
  width: ${({ width }) => width || '100%'};

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
