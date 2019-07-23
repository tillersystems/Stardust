import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Label } from './elements';

/**
 * Defines a radio button component.
 *
 * @return {jsx}
 */
const RadioButton = ({
  children,
  className,
  disabled,
  id,
  name,
  onChange,
  selectedValue,
  value,
}) => {
  const checked = selectedValue === value;
  return (
    <Wrapper disabled={disabled} onClick={() => onChange(value)} className={className}>
      <Container checked={checked} disabled={disabled}>
        <input
          defaultChecked={checked}
          type="radio"
          name={name}
          value={value}
          id={id}
          disabled={disabled}
        />
      </Container>
      <Label htmlFor={id} checked={checked} disabled={disabled}>
        {children}
      </Label>
    </Wrapper>
  );
};

const { bool, func, node, string } = PropTypes;

/** Prop types. */
RadioButton.propTypes = {
  children: node,
  className: string,
  disabled: bool,
  id: string,
  name: string,
  onChange: func,
  selectedValue: string,
  value: string,
};

/** Default props. */
RadioButton.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  id: null,
  name: null,
  onChange: () => {},
  selectedValue: null,
  value: '',
};

export default RadioButton;
