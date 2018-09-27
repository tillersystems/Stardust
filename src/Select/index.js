import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Title, Container, Dropdown, Aside, Prefix } from './elements';
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
    title: PropTypes.string,
    prefix: PropTypes.string,
    selectedValue: PropTypes.string,
    show: PropTypes.bool,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    title: null,
    prefix: null,
    selectedValue: null,
    show: false,
  };

  /** Internal state. */
  state = {
    value: '',
    showed: false,
  };

  /**
   * Handles mounting in component's lifecycle.
   */
  componentDidMount() {
    const { children, show, selectedValue } = this.props;

    if (selectedValue !== null) {
      const selectedChild = children.filter(child => child.props.value === selectedValue);
      const { children: c, aside } = selectedChild[0].props;
      this.handleClick(c, aside);
    } else {
      const { children: c, aside } = children[0].props;
      this.handleClick(c, aside);
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
        const { children: c, aside } = selectedChild[0].props;
        this.handleClick(c, aside);
      } else {
        const { children: c, aside } = children[0].props;
        this.handleClick(c, aside);
      }
    }

    if (show !== prevProps.show) {
      this.setState({ showed: show });
    }
  }

  handleClick = (val, aside) => {
    this.setState({
      value: val,
      aside: aside,
    });
  };

  toggleShow = () => {
    const { showed } = this.state;
    this.setState({ showed: !showed });
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { children, title, prefix } = this.props;
    const { value, showed, aside } = this.state;

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
      <Wrapper>
        <Title>{title}</Title>
        <Container onClick={this.toggleShow}>
          {prefix && <Prefix>{prefix}</Prefix>}
          {aside && <Aside>{aside}</Aside>}
          {value}
          <PoseGroup>
            {showed && (
              <DropdownAnimation key="DropdownAnimation">{optionsCustom}</DropdownAnimation>
            )}
          </PoseGroup>
          <select defaultValue={value}>{children}</select>
        </Container>
      </Wrapper>
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
