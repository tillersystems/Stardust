import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Container, Dropdown, Aside, Prefix, Placeholder } from './elements';
import Option from './Option';
import posed, { PoseGroup } from 'react-pose';

/**
 * Defines a RadioGroup component.
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
    text: '',
  };

  /**
   * Handles mounting in component's lifecycle.
   */
  componentDidMount() {
    const { children, show, selectedValue, placeholder } = this.props;

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

    if (show !== null) {
      this.setState({ showed: show });
    }
  }

  /**
   * Handles update in component's lifecycle.
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

  handleClick = (text, val, aside) => {
    const { onClick } = this.props;
    this.setState(
      {
        text: text,
        value: val,
        aside: aside,
      },
      () => onClick && onClick(this.state),
    );
  };

  toggleShow = () => {
    const { showed } = this.state;
    this.setState({ showed: !showed });
  };

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
    const { value, text, showed, aside } = this.state;

    // const options = React.Children.map(children, option => option);
    const optionsCustom = React.Children.map(children, option => (
      <Select.Option
        value={option.props.value}
        aside={option.props.aside}
        onClick={this.handleClick}
      >
        {option.props.children}
      </Select.Option>
    ));
    return (
      <Container tabIndex="0" onClick={this.toggleShow} onBlur={this.handleHide}>
        {prefix && <Prefix>{prefix}</Prefix>}
        {aside && <Aside>{aside}</Aside>}
        {value === '' ? <Placeholder>{text}</Placeholder> : text}
        <PoseGroup>
          {showed && <DropdownAnimation key="DropdownAnimation">{optionsCustom}</DropdownAnimation>}
        </PoseGroup>
      </Container>
    );
  }
}

const DropdownAnimation = posed(Dropdown)({
  enter: {
    opacity: 1,
    scaleY: 1,
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: {
      opacity: { ease: 'easeOut', duration: 250 },
    },
  },
});

export default Select;
