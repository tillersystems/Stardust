import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';

import { Popover } from '..';
import { Header, Menu, MenuItem } from './elements';
import Option from './Option';

/**
 * Select component displays a button as header holding one value at a time amongst
 * a list of values (children)
 *
 * See README.md and its stories from Storybook for documentation and examples
 *
 * @return {jsx}
 */
class Select extends PureComponent {
  static Option = Option;

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

  /**
   * Callback triggered on item selection
   * Triggers callback if provided and updates state if is uncontrolled
   *
   * @param {Event} event
   * @param {string} value
   *
   */
  handleSelected(event, item) {
    event.persist();
    const prevValue = this.getControllableValue('value');

    if (this.isControlled('value')) {
      this.onSelectActions(item, prevValue, event);
    } else {
      this.setState({ value: item }, () => {
        this.onSelectActions(item, prevValue, event);
      });
    }
  }

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
   * Returns true if requested prop exists
   *
   * @param {string} prop - requested property name
   *
   * @return {boolean}
   */
  isControlled = prop => this.props.hasOwnProperty(prop);

  /**
   * Returns the value a property from props if prop exists and from state otherwise
   *
   * @param {string} key - requested property name
   *
   * @return {*} value of the property
   */
  getControllableValue = key => (this.isControlled(key) ? this.props[key] : this.state[key]);

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { children, className, disabled } = this.props;
    const { displayMenu } = this.state;
    const hasPlaceholder = this.isControlled('placeholder');
    const value = this.getControllableValue('value');

    return (
      <div className={className}>
        <Header
          onClick={!disabled ? this.toggleMenu : null}
          disabled={disabled}
          aria-haspopup="true"
          aria-expanded={displayMenu}
        >
          {/* if placeholder is defined display it, otherwise use the value of the first option */}
          {hasPlaceholder && !value
            ? this.getControllableValue('placeholder')
            : Children.map(children, child => (child.props.value === value ? child : null))}
        </Header>
        <PoseGroup>
          {displayMenu && (
            <MenuAnimation key="Menu" role="menu">
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

/**
 * PropTypes Validation
 */
const { bool, func, node, string } = PropTypes;
Select.propTypes = {
  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node,

  /**
   * Prop needed by styled components
   */
  className: string,

  /**
   * If the select should be disabled or not
   */
  disabled: bool,

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
  resetValue: false,
  width: '100%',
};

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
