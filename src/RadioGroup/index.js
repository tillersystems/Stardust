import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './elements';

/**
 * Defines a RadioGroup component.
 */
class RadioGroup extends PureComponent {
  /** Prop types. */
  static propTypes = {
    children: PropTypes.node,
    groupName: PropTypes.string,
    isRow: PropTypes.bool,
    selectedValue: PropTypes.string,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    groupName: null,
    isRow: false,
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
      this.setState({ selectedValue: selectedValue });
    }
  }

  handleChange = val => {
    this.setState({ selectedValue: val });
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
        selectedValue: selectedValue,
        name: groupName,
      }),
    );
    return <Wrapper isRow={isRow}>{radios}</Wrapper>;
  }
}

export default RadioGroup;
