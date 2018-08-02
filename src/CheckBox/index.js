import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '..';
import Theme from '../Theme';
import { Wrapper, Container, Label } from './elements';

/**
 * Defines a checkbox component.
 */
class CheckBox extends PureComponent {
  /** Prop types. */
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    checked: false,
    disabled: false,
    onChange: null,
  };

  /** Internal state. */
  state = {
    checked: false,
    hasFocus: false,
  };

  /**
   * Handles mounting in component's lifecycle.
   */
  componentDidMount() {
    const { checked } = this.props;
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ ...this.state, checked });
  }

  /**
   * Handles update in component's lifecycle.
   *
   * @param {Object} prevProps - The component's previous props.
   */
  componentDidUpdate(prevProps) {
    const { checked } = this.props;

    if (checked !== prevProps.checked) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ ...this.state, checked: checked });
    }
  }

  /**
   * Handles focus event on the check box.
   */
  handleFocus = () => {
    this.setState({ ...this.state, hasFocus: true });
  };

  /**
   * Handles blur event on the check box.
   */
  handleBlur = () => {
    this.setState({ ...this.state, hasFocus: false });
  };

  /**
   * Handles click event on the check box.
   */
  handleClick = () => {
    const { checked } = this.state;
    const { disabled, onChange } = this.props;

    if (!disabled) {
      if (onChange) {
        onChange(!checked);
      } else {
        this.setState({ ...this.state, checked: !checked });
      }
    }
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { hasFocus, checked } = this.state;
    const { children, id, disabled } = this.props;

    return (
      <Wrapper onClick={this.handleClick}>
        <Container hasFocus={hasFocus} checked={checked} disabled={disabled}>
          {(checked || disabled) && (
            <Icon name="check-mark" color={Theme.palette.blue} width="1rem" height="1rem" />
          )}
          <input
            type="checkbox"
            tabIndex="0"
            id={id}
            checked={checked}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </Container>

        <Label hasFocus={hasFocus} disabled={disabled} htmlFor={id}>
          {children}
        </Label>
      </Wrapper>
    );
  }
}

export default CheckBox;
