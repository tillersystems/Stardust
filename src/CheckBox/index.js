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
    textAnnexe: PropTypes.string,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    checked: false,
    disabled: false,
    textAnnexe: null,
  };

  /** Internal state. */
  state = {
    checked: false,
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
   * Handles click event on the check box.
   */
  handleClick = () => {
    const { checked } = this.state;
    const { disabled } = this.props;

    if (!disabled) {
      this.setState({ ...this.state, checked: !checked });
    }
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { checked } = this.state;
    const { children, id, disabled, textAnnexe } = this.props;

    return (
      <Wrapper textAnnexe={textAnnexe} disabled={disabled}>
        <Container onClick={this.handleClick} checked={checked} disabled={disabled}>
          {checked && (
            <Icon name="check-mark" color={Theme.palette.white} width="1rem" height="1rem" />
          )}
          <input
            type="checkbox"
            tabIndex="0"
            id={id}
            defaultChecked={checked}
            disabled={disabled}
          />
        </Container>

        <Label disabled={disabled} htmlFor={id} textAnnexe={textAnnexe} checked={checked}>
          {children}
        </Label>
      </Wrapper>
    );
  }
}

export default CheckBox;
