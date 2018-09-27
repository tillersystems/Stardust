import React from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

import { Container, Wrapper } from './elements';

/**
 * Tooltip
 *
 * This component is in charge of displaying
 * a tooltip
 *
 * @param {bool} active // Boolean set if the Tooltip is showed or not.
 * @param {bool} hover // Boolean set to use click or hover to show the Tooltip.
 * @param {bool} top // Boolean set to positionate the tooltip above or below the element.
 * @param {string} arrowPositionX // Set position of the Tooltip's arrow.
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment). It is the element where a tooltip is hooked to.
 * @param {string} width // Tooltip width.
 * @param {string} title // Tooltip main text.
 *
 * @return {jsx}
 */

class Tooltip extends React.Component {
  /** Prop types. */
  static propTypes = {
    active: PropTypes.bool,
    hover: PropTypes.bool,
    top: PropTypes.bool,
    arrowPositionX: PropTypes.string,
    children: PropTypes.node,
    width: PropTypes.string,
    title: PropTypes.string.isRequired,
  };

  /** Default props. */
  static defaultProps = {
    active: false,
    hover: false,
    top: false,
    arrowPositionX: '50%',
    children: null,
    width: 'auto',
  };

  state = {
    active: false,
  };

  /**
   * Handles mounting in component's lifecycle.
   */
  componentDidMount() {
    const { active } = this.props;
    this.setState({ active });
  }

  /**
   * Handles update in component's lifecycle.
   *
   * @param {Object} prevProps - The component's previous props.
   */
  componentDidUpdate(prevProps) {
    const { active } = this.props;
    if (active !== prevProps.active) {
      this.setState({ active });
    }
  }

  handleClick = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  handleMouveEnter = () => {
    this.setState({ active: true });
  };

  handleMouseLeave = () => {
    this.setState({ active: false });
  };

  render() {
    const { top, hover, arrowPositionX, children, width, title } = this.props;
    const { active } = this.state;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        onClick: hover ? null : this.handleClick,
        onMouseEnter: hover ? this.handleMouveEnter : null,
        onMouseLeave: hover ? this.handleMouseLeave : null,
      }),
    );
    return (
      <Wrapper>
        {childrenWithProps}
        <PoseGroup animateOnMount>
          {active && (
            <ToolTipAnimation
              top={top}
              width={width}
              pose={active ? 'enter' : 'exit'}
              arrowPositionX={arrowPositionX}
              key="ContainerAnimation"
            >
              {title}
            </ToolTipAnimation>
          )}
        </PoseGroup>
      </Wrapper>
    );
  }
}

/**
 * Animation
 */
const ToolTipAnimation = posed(Container)({
  enter: {
    x: '-50%',
    y: ({ top }) => (top ? '-15px' : '15px'),
    opacity: 1,
  },
  exit: {
    x: '-50%',
    y: ({ top }) => (top ? '-30px' : '30px'),
    opacity: 0,
  },
});

export default Tooltip;
