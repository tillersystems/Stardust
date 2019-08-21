import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Label, ElementContainer, ElementWrapper } from './elements';

/**
 * Defines a Form Field component. It displays a field and its label.
 *
 * @return {jsx}
 */
class Field extends PureComponent {
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
      <Wrapper isRow={isRow} size={size} className={className} data-testid="form-field">
        <Container inlineLabel={inlineLabel}>
          {label !== null && !(isRow == inlineLabel && label === '') && (
            <Label inlineLabel={inlineLabel} width={labelWidth} hasFocus={hasFocus}>
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

/** Display name. */
Field.displayName = 'Form.Field';

/** Prop types. */
Field.propTypes = {
  /**
   * Should be a Button, CheckBox, Input, Select, etc. Anything part of a form
   */
  children: PropTypes.node,

  /**
   * ClassName needed by styled components
   */
  className: PropTypes.string,

  /**
   * If label of the field is lined up with the input
   */
  inlineLabel: PropTypes.bool,

  /**
   * Makes sense if used with Form and Form.Group. If the Form.Group displays its fields
   * on the same row
   */
  isRow: PropTypes.bool,

  /**
   * Label of the field, displayed at the top or at the left of the input
   */
  label: PropTypes.string,

  /**
   * Width of the label (any value accepted by the css rule)
   */
  labelWidth: PropTypes.string,

  /**
   * Width of the field (any value accepted by the css rule)
   */
  size: PropTypes.string,
};

/** Default props. */
Field.defaultProps = {
  children: null,
  className: '',
  inlineLabel: false,
  isRow: false,
  label: '',
  labelWidth: '10rem',
  size: '1',
};

export default Field;
