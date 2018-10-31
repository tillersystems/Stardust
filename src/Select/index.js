import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

import { Container, Dropdown, Aside, Prefix, Placeholder } from './elements';
import Option from './Option';

/**
 * Modal
 *
 * This component is in charge of displaying
 * a select
 *
 * @param {string} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} prefix // Add a text aside in the select next the selected value.
 * @param {string} selectedValue // Pre select the value if defined.
 * @param {string} show // Boolean set to display or hide options.
 * @param {string} placeholder // Text written in the select to explicit the differents values.
 * @param {string} onClick // Function fired when an element of the dropdown is selected. Return the state in parameter.
 *
 * @return {jsx}
 */

class Select extends PureComponent {
  static Option = Option;

  /** Prop types. */
  static propTypes = {
    children: PropTypes.node,
    prefix: PropTypes.string,
    selectedValue: PropTypes.string,
    show: PropTypes.bool,
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    prefix: null,
    selectedValue: null,
    show: false,
    placeholder: null,
    onClick: null,
  };

  /** Internal state. */
  state = {
    value: '',
    showed: false,
    placeholder: '',
  };

  /**
   * componentDidMount
   * Handles mounting
   * in component's lifecycle.
   */
  componentDidMount() {
    const { children, selectedValue, placeholder } = this.props;

    if (placeholder !== null) {
      this.handleClick(placeholder, '', null);
    } else {
      if (selectedValue !== null) {
        const selectedChild = children.filter(child => child.props.value === selectedValue);
        const { children: c, value, aside } = selectedChild[0].props;
        this.handleClick(c, value, aside);
      } else {
        const { children: c, value, aside } = children[0].props;
        this.handleClick(c, value, aside);
      }
    }
  }

  /**
   * componentDidUpdate
   * Handles update
   * in component's lifecycle.
   *
   * @param {Object} prevProps - The component's previous props.
   */
  componentDidUpdate(prevProps) {
    const { children, show, selectedValue } = this.props;

    if (selectedValue !== prevProps.selectedValue) {
      if (selectedValue !== null) {
        const selectedChild = children.filter(child => child.props.value === selectedValue);
        const { children: c, value, aside } = selectedChild[0].props;
        this.handleClick(c, value, aside);
      } else {
        const { children: c, value, aside } = children[0].props;
        this.handleClick(c, value, aside);
      }
    }

    if (show !== prevProps.show) {
      this.setState({ showed: show });
    }
  }

  /**
   * Handle Click
   *
   * @param {string} placeholder - Text written in the select to explicit the differents values.
   * @param {string} val - The option value.
   * @param {string} aside - Icon aside in the select next the selected value.
   */
  handleClick = (placeholder, val, aside) => {
    const { onClick } = this.props;
    this.setState(
      {
        placeholder: placeholder,
        value: val,
        aside: aside,
      },
      () => onClick && onClick(this.state),
    );
  };

  /**
   * Handle Toggle
   */
  toggleShow = () => {
    const { showed } = this.state;
    this.setState({ showed: !showed });
  };

  /**
   * Handle Hide
   */
  handleHide = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({ showed: false });
    }
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { children, prefix } = this.props;
    const { value, placeholder, showed, aside } = this.state;

    const options = Children.map(children, ({ props: { value, aside, children } }) => (
      <Select.Option value={value} aside={aside} onClick={this.handleClick}>
        {children}
      </Select.Option>
    ));

    return (
      <Container tabIndex="0" onClick={this.toggleShow} onBlur={this.handleHide}>
        {prefix && <Prefix>{prefix}</Prefix>}
        {aside && <Aside>{aside}</Aside>}
        {value === '' ? <Placeholder>{placeholder}</Placeholder> : placeholder}
        <PoseGroup>
          {showed && <DropdownAnimation key="DropdownAnimation">{options}</DropdownAnimation>}
        </PoseGroup>
      </Container>
    );
  }
}

/**
 * Animation
 */
const DropdownAnimation = posed(Dropdown)({
  enter: {
    opacity: 1,
    scaleY: 1,
    transition: {
      scaleY: { type: 'spring', stiffness: 900, damping: 30 },
      default: { duration: 150 },
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: { duration: 150 },
  },
});

export default Select;
