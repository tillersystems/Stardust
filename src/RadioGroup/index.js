import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './elements';

const { bool, func, node, string } = PropTypes;

/**
 * A RadioGroup component groups radio buttons.
 *
 */
class RadioGroup extends PureComponent {
  /** Prop types. */
  static propTypes = {
    children: node,
    groupName: string,
    isRow: bool,
    onChange: func,
    selectedValue: string,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    groupName: null,
    isRow: false,
    onChange: () => {},
    selectedValue: null,
  };

  /** Internal state. */
  constructor() {
    super();
    this.state = {
      selectedValue: null,
    };
  }

  /**
   * Handles mounting in component's lifecycle.
   */
  componentDidMount() {
    const { selectedValue } = this.props;
    /* eslint-disable react/no-did-mount-set-state */
    if (selectedValue !== null) {
      this.setState({ selectedValue: selectedValue });
    }
  }

  /**
   * Handles update in component's lifecycle.
   *
   * @param {Object} prevProps - The component's previous props.
   */
  componentDidUpdate(prevProps) {
    const { selectedValue } = this.props;

    if (selectedValue !== prevProps.selectedValue) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ selectedValue });
    }
  }

  handleChange = value => {
    const { onChange } = this.props;

    this.setState(
      {
        selectedValue: value,
      },
      () => {
        onChange && onChange(value);
      },
    );
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { selectedValue } = this.state;
    const { children, groupName, isRow } = this.props;

    const radios = React.Children.map(children, radio =>
      React.cloneElement(radio, {
        onChange: this.handleChange,
        selectedValue,
        name: groupName,
      }),
    );
    return <Wrapper isRow={isRow}>{radios}</Wrapper>;
  }
}

export default RadioGroup;
