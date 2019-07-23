import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './elements';

/**
 * A RadioGroup component groups radio buttons.
 *
 */
class RadioGroup extends PureComponent {
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
    const { children, className, groupName, isRow } = this.props;

    const radios = React.Children.map(children, radio =>
      React.cloneElement(radio, {
        onChange: this.handleChange,
        selectedValue,
        name: groupName,
      }),
    );
    return (
      <Wrapper isRow={isRow} className={className}>
        {radios}
      </Wrapper>
    );
  }
}

const { bool, func, node, string } = PropTypes;

/** Prop types. */
RadioGroup.propTypes = {
  children: node,
  className: string,
  groupName: string,
  isRow: bool,
  onChange: func,
  selectedValue: string,
};

/** Default props. */
RadioGroup.defaultProps = {
  children: null,
  className: '',
  groupName: null,
  isRow: false,
  onChange: null,
  selectedValue: null,
};

export default RadioGroup;
