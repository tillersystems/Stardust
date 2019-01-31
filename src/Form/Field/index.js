import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Label, ElementContainer, ElementWrapper } from './elements';

/**
 * Defines a Form Field component. This groups a field and a label.
 *
 * @return {jsx}
 */
class Field extends PureComponent {
  /** Display name. */
  static displayName = 'Form.Field';

  /** Prop types. */
  static propTypes = {
    children: PropTypes.node,
    isRow: PropTypes.bool,
    inlineLabel: PropTypes.bool,
    labelWidth: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    isRow: false,
    inlineLabel: false,
    labelWidth: '10rem',
    label: '',
    className: '',
    size: '1',
  };

  /** Internal state. */
  state = {
    // Used to save whether inner component has focus or not.
    hasFocus: false,
  };

  /**
   * Handles focus gained by the field's element.
   */
  handleFocus = () => {
    this.setState({ ...this.state, hasFocus: true });
  };

  /**
   * Handles focus lost by the field's element.
   */
  handleBlur = () => {
    this.setState({ ...this.state, hasFocus: false });
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { hasFocus } = this.state;
    const { children, label, isRow, inlineLabel, labelWidth, className, size } = this.props;

    const injected = Children.map(children, child => {
      const {
        type: { displayName },
      } = child;

      const childProps = { _onFocus: this.handleFocus, _onBlur: this.handleBlur };

      if (displayName === 'Button') {
        childProps.type = 'submit';
      }

      return cloneElement(child, childProps);
    });

    return (
      <Wrapper isRow={isRow} size={size} className={className}>
        <Container inlineLabel={inlineLabel}>
          {label !== null && !(isRow == inlineLabel && label === '') && (
            <Label labelInline={inlineLabel} width={labelWidth} hasFocus={hasFocus}>
              {label}
            </Label>
          )}
          <ElementContainer>
            <ElementWrapper>{injected}</ElementWrapper>
          </ElementContainer>
        </Container>
      </Wrapper>
    );
  }
}

export default Field;
