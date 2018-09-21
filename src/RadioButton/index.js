import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Label } from './elements';

/**
 * Defines a checkbox component.
 */
function RadioButton(props) {
  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  const { children, id, value, selectedValue, name, onChange, disabled } = props;
  const checked = selectedValue === value;
  return (
    <Wrapper disabled={disabled}>
      <Container onClick={() => onChange(value)} checked={checked} disabled={disabled}>
        <input
          defaultChecked={checked}
          type="radio"
          name={name}
          value={value}
          onChange={() => onChange(value)}
          id={id}
          disabled={disabled}
        />
      </Container>
      <Label htmlFor={id} checked={checked} disabled={disabled}>
        {children}
      </Label>
    </Wrapper>
  );
}

/** Prop types. */
RadioButton.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  value: PropTypes.string,
  selectedValue: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

/** Default props. */
RadioButton.defaultProps = {
  children: null,
  id: null,
  value: '',
  selectedValue: null,
  name: null,
  onChange: () => {},
  disabled: false,
};

export default RadioButton;
