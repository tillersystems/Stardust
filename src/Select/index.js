/* eslint-disable react/require-default-props */

import React, { PureComponent, Children, Fragment } from 'react';
import PropTypes from 'prop-types';

import Popover from '../Popover';
import OptionsList from '../OptionsList';

import { Container } from './elements';

import DefaultHeader from './Header';

/**
 * A fake component to pass options as JSX instead of props.
 */
const Option = () => null;

/**
 * Tansform the Option component above into array of object to pass as options props to OptionsList.
 *
 * @param {*} options
 * @param {*} values
 */
const transformChildrenToOptions = children => {
  return Children.toArray(children)
    .map(({ props, type }) =>
      type === Option
        ? {
            label: props.label || props.children,
            value: props.value || props.children.toString(),
          }
        : null,
    )
    .filter(Boolean);
};

/**
 * Default function to use to display selected values.
 *
 * @param {array} selected - the selected options
 * @param {array} values - the selected values
 * @param {array} options - the options available
 */
// eslint-disable-next-line no-unused-vars
const defaultDisplayValue = (selected, _values, _options) => {
  return selected.map(({ value, label }, index) => (
    <Fragment key={value}>
      {index > 0 && ', '}
      {label}
    </Fragment>
  ));
};

/**
 * A Dropdown displays content through its children prop that must be components wrapping text.
 * The trigger is a button displaying text provided by the prop `title`
 *
 * See README.md and storybook for more documentation
 *
 * @return {jsx}
 */

class Select extends PureComponent {
  /** Internal state. */
  state = {
    isOpen: false,
    values: [],
    searchKeyword: '',
    portalPosition: { left: '0px', top: '0px' },
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

    if (this.isControlled('isOpen')) {
      onToggle && onToggle(event);
    } else {
      this.setState(
        {
          isOpen: false,
        },
        () => {
          onToggle && onToggle(false);
        },
      );
    }
  };

  onChange = values => {
    const { onChange, allowMultiple } = this.props;

    if (this.isControlled('values')) {
      if (onChange) {
        onChange(values);
      }
    } else {
      this.setState({
        values,
      });
    }

    if (!this.isControlled('isOpen') && !allowMultiple) {
      this.setState({
        isOpen: false,
      });
    }
  };

  /**
   * Toggle Menu display and clear search input.
   * Triggers callback if parent provided it
   *
   */
  toggleMenu = () => {
    const isOpen = this.getControllableValue('isOpen');
    const { onToggle, disabled } = this.props;

    if (disabled) return;

    if (this.isControlled('isOpen')) {
      onToggle && onToggle(event);
    } else {
      this.setState(
        prevState => ({
          isOpen: !prevState.isOpen,
        }),
        () => {
          onToggle && onToggle(!isOpen);
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
      options,
      children,
      className,
      contentWrapperStyle,
      contentRef,
      HeaderComponent,
      placeholder,
      modifiers,
      usePortal,
      onChange /* unused in render */,
      disabled,
      displayValue,
      ...optionsListProps
    } = this.props;

    const { contentWidth } = this.state;

    const isOpen = this.getControllableValue('isOpen');
    const values = this.getControllableValue('values');

    const Header = HeaderComponent || DefaultHeader;
    const selectOptions = options || transformChildrenToOptions(children);
    const selected = values
      .map(value => selectOptions.find(option => option.value === value))
      .filter(Boolean);
    const value = displayValue || defaultDisplayValue;

    return (
      <Container className={className} disabled={disabled} data-testid="select">
        <Popover
          content={
            <OptionsList
              options={selectOptions}
              values={values}
              OptionComponent={OptionsList.SimpleOption}
              onChange={this.onChange}
              {...optionsListProps}
            />
          }
          contentRef={contentRef}
          contentWrapperStyle={{
            display: 'flex',
            overflow: 'hidden',
            originX: '50%',
            originY: '0%',
            ...contentWrapperStyle,
          }}
          isOpen={isOpen}
          modifiers={modifiers}
          onClickOutside={this.onClickOutside}
          triggerRef={this.triggerRef}
          usePortal={usePortal}
          width={contentWidth}
        >
          <Header
            options={selectOptions}
            values={values}
            onClick={this.toggleMenu}
            isOpen={isOpen}
            placeholder={placeholder}
            disabled={disabled}
          >
            {value && typeof value === 'function' ? value(selected, values, selectOptions) : value}
          </Header>
        </Popover>
      </Container>
    );
  }
}

/**
 * PropTypes Validation
 */
const { array, bool, func, node, object, oneOfType, string } = PropTypes;

Select.propTypes = {
  /**
   * OptionsList props to allow multiple select values
   */
  allowMultiple: bool,

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
   * CSS for popover content, useful for sizing
   */
  contentWrapperStyle: object,

  /**
   * If the select should be disabled or not
   */
  disabled: bool,

  /**
   * A value or function to display the selected values.
   * It receives selected, values and options as arguments.
   * Falsy returned value will display the placeholder.
   */
  displayValue: oneOfType([node, func]),

  /**
   * Overrides header component for custom render
   */
  HeaderComponent: func,

  /**
   * Controlled value for displaying popover
   */
  isOpen: bool,

  /**
   * Customize popper behaviour. Plugins to alter the behaviour of the popper. See https://popper.js.org/popper-documentation.html
   */
  modifiers: object,

  /**
   * List of options of select.
   */
  options: array,

  /**
   * Callback fired when an element of the <Select /> is selected
   */
  onChange: func,

  /**
   * Callback fired when the <Select /> is toggled (becomes closed or open)
   */
  onToggle: func,

  /**
   * Placeholder of the <Select /> component in the header. Displayed only if no value has been set yet.
   */
  placeholder: string,

  /**
   * Displays the content on a portal
   */
  usePortal: bool,

  /**
   * Selected values identifier
   */
  values: array,
};

/**
 * Default props
 */
Select.defaultProps = {
  allowMultiple: false,
  children: null,
  className: '',
  disabled: false,
  usePortal: false,
};

Select.Option = Option;
Select.Header = DefaultHeader;

export default Select;
